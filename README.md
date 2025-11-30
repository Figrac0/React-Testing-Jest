# React Testing Demo 

A comprehensive React testing demonstration showcasing modern testing practices with Jest and React Testing Library.

This repository demonstrates professional React testing methodologies using Jest and React Testing Library. It features various testing scenarios including unit tests, component tests, async operations testing, user interactions, and mock functions.

## 🚀 Features Tested

###  Component Testing
- **Greeting Component**: State changes and conditional rendering
- **Counter Component**: User interactions, callback functions, and state management
- **UserProfile Component**: Conditional rendering and prop testing
- **LoginForm Component**: Form validation, async operations, and error handling
- **Async Component**: API calls, error boundaries, and loading states

### 🧪 Testing Techniques Demonstrated

#### Basic Testing

```javascript
// Component rendering
test('renders component correctly', () => {
  render(<Component />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});
```

#### User Interactions

```javascript
// User event testing
test('handles user clicks', () => {
  render(<Counter />);
  userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

#### Async Operations

```javascript
// API testing with mocks
test('fetches and displays data', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData)
  }));
  
  render(<AsyncComponent />);
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(2);
});
```
#### Mock Functions

```javascript
// Callback testing
test('calls callback with correct data', () => {
  const mockCallback = jest.fn();
  render(<Component onAction={mockCallback} />);
  
  userEvent.click(screen.getByRole('button'));
  expect(mockCallback).toHaveBeenCalledWith(expectedData);
});
```

## 🛠 Tech Stack

- **React 17** - UI library
- **Jest** - Testing framework
- **React Testing Library** - DOM testing utilities
- **User Event** - User interaction simulation
- **JavaScript (ES6+)** - Programming language

## 📁 Project Structure

```text
src/
├── components/
│   ├── Async/           # API calls and error handling
│   ├── Counter/         # State management and user interactions
│   ├── Greeting/        # Conditional rendering
│   ├── LoginForm/       # Form validation and async operations
│   └── UserProfile/     # Props and conditional rendering
├── App.js               # Main application component
└── setupTests.js        # Testing configuration
```

## 📊 Test Coverage

The project maintains comprehensive test coverage including:

- ✅ Component rendering
- ✅ User interactions
- ✅ State changes
- ✅ Async operations
- ✅ Error handling
- ✅ Prop validation
- ✅ Callback functions

## 🎓 Learning Outcomes

By studying this project, you'll understand:

- How to structure React tests for maintainability
- Best practices for testing user interactions
- Proper async testing techniques
- Mocking strategies for external dependencies
- Error handling in component tests
- Test organization and cleanup

## 🤝 Contributing

This project serves as an educational resource for React testing patterns. Feel free to explore, learn, and adapt these testing strategies for your own projects.
