import Logo from "@/components/Logo";
import request from "@/lib/request";
import showToast from "@/lib/toast";
import { Label, TextInput, Button } from "flowbite-react";
import { useState, useCallback, useEffect } from "react";

const ResetPasswordForm = ({ code }) => {
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({});

    const validateForm = useCallback(() => {
        const { password, confirmPassword } = formData;
        const newErrors = {};
        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required.";
        else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    useEffect(() => { validateForm(); }, [formData, validateForm]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleBlur = (field) => setTouched({ ...touched, [field]: true });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await request("/api/auth/reset-password", {
            method: "POST",
            body: {
                code: code,
                password: formData.password,
                passwordConfirmation: formData.confirmPassword,
            }
        });

        if (res.error) showToast("error", `An error occurred: ${res.error.message}`)
        else {
            showToast("success", "Password reset successfully. You can now login with your new password.");
            setFormData({ password: "", confirmPassword: ""});
        }
        setLoading(false);
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <Logo />
            <div>
                <Label htmlFor="password" value="New password" />
                <TextInput id="password" type="password" placeholder="••••••••" name="password" value={formData.password} onChange={handleChange} onBlur={() => handleBlur("password")} required />
                {errors.password && touched.password && (
                    <p className="text-red-500 text-sm font-light">{errors.password}</p>
                )}
            </div>

            <div>
                <Label htmlFor="confirm-password" value="Confirm password" />
                <TextInput id="confirm-password" type="password" placeholder="••••••••" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={() => handleBlur("confirmPassword")} required />
                {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-sm font-light">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            <Button type="submit" className="mt-4 w-full" disabled={loading}>
                {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
        </form>
    );
};

export default ResetPasswordForm;
