import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter Component", () => {
    test("renders counter with initial value", () => {
        render(<Counter initialValue={5} />);
        const countElement = screen.getByText("5");
        expect(countElement).toBeInTheDocument();
    });

    test("increments counter when '+' button is clicked", () => {
        render(<Counter />);

        const incrementButton = screen.getByRole("button", {
            name: /increment/i,
        });
        userEvent.click(incrementButton);

        const countElement = screen.getByText("1");
        expect(countElement).toBeInTheDocument();
    });

    test("decrements counter when '-' button is clicked", () => {
        render(<Counter initialValue={3} />);

        const decrementButton = screen.getByRole("button", {
            name: /decrement/i,
        });
        userEvent.click(decrementButton);

        const countElement = screen.getByText("2");
        expect(countElement).toBeInTheDocument();
    });

    test("resets counter to 0 when reset button is clicked", () => {
        render(<Counter initialValue={10} />);

        const resetButton = screen.getByRole("button", { name: /reset/i });
        userEvent.click(resetButton);

        const countElement = screen.getByText("0");
        expect(countElement).toBeInTheDocument();
    });

    test("calls onCounterChange callback with new value", () => {
        const mockOnChange = jest.fn();
        render(<Counter onCounterChange={mockOnChange} />);

        const incrementButton = screen.getByRole("button", {
            name: /increment/i,
        });
        userEvent.click(incrementButton);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    test("handles multiple user interactions correctly", () => {
        render(<Counter initialValue={2} />);

        const incrementButton = screen.getByRole("button", {
            name: /increment/i,
        });
        const decrementButton = screen.getByRole("button", {
            name: /decrement/i,
        });

        userEvent.click(incrementButton);
        userEvent.click(incrementButton);
        userEvent.click(decrementButton);

        const countElement = screen.getByText("3");
        expect(countElement).toBeInTheDocument();
    });
});
