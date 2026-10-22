export function formatGreeting(name: string, shout = false): string {
	const greeting = `Hello, ${name.trim() || "world"}!`;
	return shout ? greeting.toUpperCase() : greeting;
}
