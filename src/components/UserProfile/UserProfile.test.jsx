import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";

const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    isPremium: true,
};

describe("UserProfile Component", () => {
    test("renders login message when user is not provided", () => {
        render(<UserProfile user={null} />);

        const loginMessage = screen.getByText(/please log in/i);
        expect(loginMessage).toBeInTheDocument();

        const userName = screen.queryByTestId("user-name");
        expect(userName).not.toBeInTheDocument();
    });

    test("renders user data when user is provided", () => {
        render(<UserProfile user={mockUser} />);

        expect(screen.getByTestId("user-name")).toHaveTextContent(
            mockUser.name
        );
        expect(screen.getByTestId("user-email")).toHaveTextContent(
            mockUser.email
        );
        expect(screen.getByTestId("user-age")).toHaveTextContent(
            mockUser.age.toString()
        );

        const loginMessage = screen.queryByText(/please log in/i);
        expect(loginMessage).not.toBeInTheDocument();
    });

    test("renders premium badge for premium users", () => {
        render(<UserProfile user={mockUser} />);

        const premiumBadge = screen.getByTestId("premium-badge");
        expect(premiumBadge).toBeInTheDocument();
        expect(premiumBadge).toHaveTextContent("Premium User");
    });

    test("does not render premium badge for non-premium users", () => {
        const regularUser = { ...mockUser, isPremium: false };
        render(<UserProfile user={regularUser} />);

        const premiumBadge = screen.queryByTestId("premium-badge");
        expect(premiumBadge).not.toBeInTheDocument();
    });

    test("matches snapshot with user data", () => {
        const { container } = render(<UserProfile user={mockUser} />);
        expect(container).toMatchSnapshot();
    });

    test("matches snapshot without user", () => {
        const { container } = render(<UserProfile user={null} />);
        expect(container).toMatchSnapshot();
    });
});
