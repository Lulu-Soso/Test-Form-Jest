import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RegistrationForm from "../components/RegistrationForm";

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

  test("displays 'Invalid email address' when email is invalid", () => {
    render(<RegistrationForm />);
    const emailInput = screen.getByLabelText("Email:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText("Invalid email address");
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("RegistrationForm Component (Functional Tests)", () => {
  // test("submits the form successfully and displays success message", async () => {
  //   render(<RegistrationForm />);
  //   const usernameInput = screen.getByLabelText("Username:");
  //   const emailInput = screen.getByLabelText("Email:");
  //   const passwordInput = screen.getByLabelText("Password:");
  //   const submitButton = screen.getByText("Submit");
  
  //   fireEvent.change(usernameInput, { target: { value: "testuser" } });
  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });
  
  //   fireEvent.click(submitButton);
  
  //  // Attendre que le message de succès s'affiche
  // await waitFor(() => {
  //   const successMessage = screen.getByText("Registration successful");
  //   expect(successMessage).toBeInTheDocument();
  //   expect(successMessage).toHaveStyle("color: green"); // Vérifiez le style du message
  // });
  
  //   // Vérifiez que le formulaire n'est plus rendu
  //   expect(screen.queryByLabelText("Username:")).not.toBeInTheDocument();
  //   expect(screen.queryByLabelText("Email:")).not.toBeInTheDocument();
  //   expect(screen.queryByLabelText("Password:")).not.toBeInTheDocument();
  // });
  
  

  test("displays 'Email submission failed' when email is invalid", async () => {
    render(<RegistrationForm />);
    const usernameInput = screen.getByLabelText("Username:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "invalidemail" } }); // Adresse e-mail invalide
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Invalid email address");
      expect(errorMessage).toBeInTheDocument(); // Vérifie que le message d'erreur s'affiche
    });
  });
});

