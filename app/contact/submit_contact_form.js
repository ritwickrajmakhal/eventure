"use server";
import prisma from "@/lib/prisma";

// Define the function to submit the contact form
const submit_contact_form = async (formData) => {
  // Extract form data
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  try {
    // Validate form fields
    if (!email || !subject || !message) {
      throw new Error("All fields are required");
    }

    // Insert the contact form data into the database
    const result = await prisma.contact.create({
      data: {
        email,
        subject,
        message,
      },
    });

    // Return the result
    return { success: true, data: result };

  } catch (error) {
    // Log the error for debugging
    console.error("Error submitting contact form:", error);

    // Return an error message
    return { success: false, error: error.message };
  }
};

export default submit_contact_form;
