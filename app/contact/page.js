"use client";
import { useState } from "react";
import request from "@/lib/request";
import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";

const ContactPage = () => {
  const [pending, setPending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setFeedbackMessage("");

    const formData = new FormData(event.target);
    const files = formData.getAll("file");

    const jsonData = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      // Send message data
      const response = await request("/api/contact-uses", {
        method: "POST",
        body: { data: jsonData },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // If files exist, handle file uploads
      if (files.length > 0 && files[0].size > 0) {
        const fileData = new FormData();
        files.forEach((file) => fileData.append("files", file, file.name));
        fileData.append("ref", "api::contact-us.contact-us");
        fileData.append("refId", response.data.id);
        fileData.append("field", "attachments");

        const uploadResponse = await request("/api/upload", {
          method: "POST",
          body: fileData,
        });

        if (uploadResponse.error) {
          throw new Error(uploadResponse.error.message);
        }
      }

      setFeedbackMessage("Your message has been sent successfully.");
      event.target.reset();
    } catch (error) {
      setFeedbackMessage(`Error: ${error.message}`);
    } finally {
      setPending(false);
    }
  };

  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="space-y-8"
        >
          <div>
            <Label
              htmlFor="email"
              value="Your email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="subject"
              value="Subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            <TextInput
              id="subject"
              name="subject"
              type="text"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Label
              htmlFor="message"
              value="Your message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            <Textarea
              id="message"
              name="message"
              placeholder="Leave a comment..."
              required
              rows={6}
            />
          </div>
          <div>
            <Label
              htmlFor="message"
              value="Attach a file"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            <FileInput
              name="file"
              id="file-upload-helper-text"
              multiple={true}
            />
          </div>
          <Button color="blue" type="submit" className="flex m-auto">
            {pending ? "Sending..." : "Send message"}
          </Button>
          {feedbackMessage && (
            <p
              className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300"
              aria-live="polite"
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
