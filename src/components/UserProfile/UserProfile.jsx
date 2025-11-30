const UserProfile = ({ user }) => {
    if (!user) {
        return (
            <div>
                <h2>User Profile</h2>
                <p>Please log in to see your profile.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p data-testid="user-name">Name: {user.name}</p>
            <p data-testid="user-email">Email: {user.email}</p>
            <p data-testid="user-age">Age: {user.age}</p>
            {user.isPremium && (
                <p data-testid="premium-badge">⭐ Premium User</p>
            )}
        </div>
    );
};

export default UserProfile;
