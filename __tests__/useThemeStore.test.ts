import { describe, it, expect, beforeEach } from "vitest";
import { useThemeStore } from "@/app/store/useThemeStore";

describe("useThemeStore", () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useThemeStore.setState({ theme: "dark" });
  });

  it("defaults to dark theme", () => {
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("toggles from dark to light", () => {
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("toggles from light back to dark", () => {
    useThemeStore.getState().toggleTheme(); // dark → light
    useThemeStore.getState().toggleTheme(); // light → dark
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("setTheme sets explicitly to light", () => {
    useThemeStore.getState().setTheme("light");
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("setTheme sets explicitly to dark", () => {
    useThemeStore.getState().setTheme("light");
    useThemeStore.getState().setTheme("dark");
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("toggle is idempotent after even number of calls", () => {
    const initial = useThemeStore.getState().theme;
    useThemeStore.getState().toggleTheme();
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe(initial);
  });
});
