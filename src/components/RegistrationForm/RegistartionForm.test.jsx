import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RegistrationForm from "../RegistrationForm";

describe("RegistrationForm Component (Unit Tests)", () => {
  test("renders the registration form", () => {
    render(<RegistrationForm />);
    const usernameInput = screen.getByLabelText("Username:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Submit");
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("updates form data when input values change", () => {
    render(<RegistrationForm />);
    const usernameInput = screen.getByLabelText("Username:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});

describe("RegistrationForm Component (Functional Tests)", () => {
  test("submits the form with the correct data and shows a success message", async () => {
    render(<RegistrationForm />);
    const usernameInput = screen.getByLabelText("Username:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const confirmationMessage = screen.getByText("Registration successful");
      expect(confirmationMessage).toBeInTheDocument(); // Vérifie que le message est présent
    });
  });
});
