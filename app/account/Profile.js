"use client";
import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import request from "@/lib/request";
import showToast from "@/lib/toast";


const Profile = ({ user, setUser, session }) => {
  const [loading, setLoading] = useState({
    password: false,
    image: false,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePassword = async () => {
    if (session) {
      if (password !== confirmPassword) {
        showToast("error", "Passwords do not match");
        return;
      }
      setLoading({ ...loading, password: true });
      const res = await request("/api/auth/change-password", {
        method: "POST",
        body: {
          currentPassword: currentPassword,
          password: password,
          passwordConfirmation: confirmPassword,
        },
        headers: {
          Authorization: "Bearer " + session.jwt,
        },
      });
      res.error ? showToast("error", res.error.message) : showToast("success", "Password updated successfully");
      setLoading({ ...loading, password: false });
    }
  };

  const uploadImage = async (e) => {
    if (session) {
      const file = e.target.files[0]; // Select file from input
      if (file) {
        const formData = new FormData();
        formData.append("files", file, file.name);
        formData.append("ref", "plugin::users-permissions.user");
        formData.append("refId", session.id);
        formData.append("field", "avatar");

        try {
          // Upload image
          setLoading({ ...loading, image: true });
          let response = await request("/api/upload", {
            method: "POST",
            body: formData, // Send as FormData
            headers: {
              Authorization: `Bearer ${session.jwt}`,
            },
          });

          if (response.error) {
            console.error("File upload error:", response.error);
            return;
          }

          // Update user's avatar URL
          const uploadedImageUrl = response.result[0]?.url; // Access the uploaded file URL
          setUser({ ...user, avatar: { url: uploadedImageUrl } });

          // Save the avatar URL to user profile
          await request(`/api/users/${session.id}`, {
            method: "PUT",
            body: {
              avatar: `${process.env.NEXT_PUBLIC_API_URL || ""
                }${uploadedImageUrl}`,
            },
            headers: {
              Authorization: `Bearer ${session.jwt}`,
            },
          });
        } catch (error) {
          console.error("Error uploading image:", error.message);
        } finally {
          setLoading({ ...loading, image: false });
        }
      }
    }
  };

  return (
    <>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
          {user?.avatar ? (
            <Image
              className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 object-cover"
              src={`${process.env.NEXT_PUBLIC_API_URL || ""}${user.avatar?.url
                }`}
              alt="Profile picture"
              width={112}
              height={112}
            />
          ) : (
            <Image
              className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
              src="/avatar.jpg"
              alt="Profile picture"
              width={112}
              height={112}
            />
          )}
          <div>
            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
              Profile picture
            </h3>
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              JPG, GIF or PNG. Max size of 800K
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                name="file"
                multiple={false}
                accept="image/*"
                id="file-upload"
                className="hidden"
                onChange={uploadImage}
              />
              <Button
                gradientDuoTone="cyanToBlue"
                onClick={() => document.getElementById("file-upload").click()}
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                </svg>
                {loading.image ? "Uploading..." : "Upload image"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Information Section */}
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          Password information
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePassword();
          }}
        >
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="current-password" value="Current password" />
              <TextInput
                id="current-password"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="password" value="New password" />
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                data-popover-target="popover-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="confirm-password" value="Confirm password" />
              <TextInput
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-span-6 sm:col-full flex items-center">
              <Button color="blue" type="submit">{loading.password ? "Updating..." : "Update password"}</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
