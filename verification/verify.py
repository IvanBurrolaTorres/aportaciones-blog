from playwright.sync_api import sync_playwright, expect

def verify_blog(page):
    # Navigate to home
    print("Navigating to home...")
    page.goto("http://localhost:3000")

    # Wait for content to load
    print("Waiting for content...")
    expect(page.get_by_role("heading", name="Aportaciones")).to_be_visible(timeout=10000)

    # Screenshot Home
    print("Taking screenshot of Home...")
    page.screenshot(path="verification/home.png", full_page=True)

    # Check dark mode toggle
    print("Checking dark mode toggle...")
    page.get_by_label("Toggle theme").click()
    page.wait_for_timeout(500) # Wait for transition
    page.screenshot(path="verification/home_dark.png", full_page=True)

    # Since we don't have real data, the list might be empty or have dummy data if we mocked it.
    # But in the current setup, it tries to fetch from Sanity and fails or returns empty.
    # The page handles empty state.

    expect(page.get_by_text("Aún no hay aportaciones publicadas")).to_be_visible()

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_blog(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
