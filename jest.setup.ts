// jest.setup.ts
import "@testing-library/jest-dom";

// Mock Next.js font loaders used in app/fonts.ts to avoid runtime errors in Jest
jest.mock("next/font/local", () => {
	return {
		__esModule: true,
		default: (options: any) => ({
			className: "mocked-local-font",
			variable: options?.variable ?? "--mocked-local-font",
			style: { fontFamily: "mocked-local-font" },
		}),
	};
});

jest.mock("next/font/google", () => {
	return new Proxy(
		{},
		{
			get: () => (options: any) => ({
				className: "mocked-google-font",
				variable: options?.variable ?? "--mocked-google-font",
				style: { fontFamily: "mocked-google-font" },
			}),
		}
	);
});
