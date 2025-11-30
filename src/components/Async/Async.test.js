import { render, screen, waitFor } from "@testing-library/react";
import Async from "./Async";

const mockPosts = [
    { id: "p1", title: "First Post" },
    { id: "p2", title: "Second Post" },
];

describe("Async Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders posts if request succeeds", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockPosts),
            })
        );

        render(<Async />);

        const listItemElements = await screen.findAllByRole("listitem");
        expect(listItemElements).toHaveLength(2);

        expect(screen.getByText("First Post")).toBeInTheDocument();
        expect(screen.getByText("Second Post")).toBeInTheDocument();

        // Убеждаемся, что сообщение об ошибке не отображается
        const errorMessage = screen.queryByTestId("error-message");
        expect(errorMessage).not.toBeInTheDocument();
    });

    test("renders no posts when empty array is returned", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        );

        render(<Async />);

        // Ждем пока список станет пустым
        await waitFor(() => {
            expect(screen.queryAllByRole("listitem")).toHaveLength(0);
        });

        const listElement = screen.getByRole("list");
        expect(listElement).toBeEmptyDOMElement();

        // Убеждаемся, что сообщение об ошибке не отображается
        const errorMessage = screen.queryByTestId("error-message");
        expect(errorMessage).not.toBeInTheDocument();
    });

    test("handles fetch network error", async () => {
        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        global.fetch = jest.fn(() => Promise.reject(new Error("API is down")));

        render(<Async />);

        // Ждем появления сообщения об ошибке
        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toBeInTheDocument();
        });

        // Отдельно проверяем текст ошибки
        const errorMessage = screen.getByTestId("error-message");
        expect(errorMessage).toHaveTextContent("API is down");

        // Проверяем что список пуст
        const listItemElements = screen.queryAllByRole("listitem");
        expect(listItemElements).toHaveLength(0);

        consoleSpy.mockRestore();
    });

    test("handles HTTP error response (non-200 status)", async () => {
        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({ message: "Not found" }),
            })
        );

        render(<Async />);

        // Ждем появления сообщения об ошибке
        await waitFor(() => {
            expect(screen.getByTestId("error-message")).toBeInTheDocument();
        });

        // Отдельно проверяем текст ошибки
        const errorMessage = screen.getByTestId("error-message");
        expect(errorMessage).toHaveTextContent("Network response was not ok");

        // Проверяем что список пуст
        const listItemElements = screen.queryAllByRole("listitem");
        expect(listItemElements).toHaveLength(0);

        consoleSpy.mockRestore();
    });

    test("calls fetch with correct URL", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockPosts),
            })
        );

        render(<Async />);

        await screen.findAllByRole("listitem");

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            "https://jsonplaceholder.typicode.com/posts"
        );

        // Убеждаемся, что сообщение об ошибке не отображается
        const errorMessage = screen.queryByTestId("error-message");
        expect(errorMessage).not.toBeInTheDocument();
    });
});
