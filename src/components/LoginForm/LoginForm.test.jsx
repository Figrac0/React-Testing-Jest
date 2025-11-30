import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

const mockOnLogin = jest.fn();

describe("LoginForm Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Используем настоящие таймеры для упрощения
        jest.useRealTimers();
    });

    test("renders login form", () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /login/i })
        ).toBeInTheDocument();
    });

    test("allows user to enter email and password", () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        userEvent.type(emailInput, "test@example.com");
        userEvent.type(passwordInput, "mypassword");

        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("mypassword");
    });

    test("shows validation error when submitting empty form", () => {
        render(<LoginForm />);

        const submitButton = screen.getByRole("button", { name: /login/i });
        userEvent.click(submitButton);

        const errorMessage = screen.getByText(
            /email and password are required/i
        );
        expect(errorMessage).toBeInTheDocument();
        expect(mockOnLogin).not.toHaveBeenCalled();
    });

    test("calls onLogin with user data when valid credentials are provided", async () => {
        render(<LoginForm onLogin={mockOnLogin} />);

        // Вводим валидные данные
        userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
        userEvent.type(screen.getByLabelText(/password/i), "password123");

        // Нажимаем кнопку отправки
        userEvent.click(screen.getByRole("button", { name: /login/i }));

        // Ждем завершения асинхронной операции
        await waitFor(
            () => {
                expect(mockOnLogin).toHaveBeenCalledTimes(1);
            },
            { timeout: 3000 }
        ); // Увеличиваем timeout

        expect(mockOnLogin).toHaveBeenCalledWith({
            name: "Test User",
            email: "test@test.com",
        });
    });

    test("shows error message when invalid credentials are provided", async () => {
        render(<LoginForm onLogin={mockOnLogin} />);

        // Вводим невалидные данные
        userEvent.type(screen.getByLabelText(/email/i), "wrong@test.com");
        userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");

        // Нажимаем кнопку отправки
        userEvent.click(screen.getByRole("button", { name: /login/i }));

        // Ждем появления ошибки
        await waitFor(
            () => {
                const errorMessage = screen.getByText(/invalid credentials/i);
                expect(errorMessage).toBeInTheDocument();
            },
            { timeout: 3000 }
        );

        expect(mockOnLogin).not.toHaveBeenCalled();
    });

    test("clears error when user starts typing again", () => {
        render(<LoginForm />);

        const submitButton = screen.getByRole("button", { name: /login/i });
        userEvent.click(submitButton);

        const errorMessage = screen.getByText(
            /email and password are required/i
        );
        expect(errorMessage).toBeInTheDocument();

        userEvent.type(screen.getByLabelText(/email/i), "test");

        expect(errorMessage).not.toBeInTheDocument();
    });
});
