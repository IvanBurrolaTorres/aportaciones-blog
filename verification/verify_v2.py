from playwright.sync_api import sync_playwright, expect

def verify_blog(page):
    # Navigate to home
    print("Navigating to home...")
    page.goto("http://localhost:3000")

    # Wait for content to load
    print("Waiting for content...")
    expect(page.get_by_role("heading", name="Explora. Aprende. Construye.")).to_be_visible(timeout=15000)

    # Screenshot Home
    print("Taking screenshot of Home...")
    page.screenshot(path="verification/home_v2.png", full_page=True)

    # Check dark mode toggle
    print("Checking dark mode toggle...")
    page.get_by_label("Toggle theme").click()
    page.wait_for_timeout(500) # Wait for transition
    page.screenshot(path="verification/home_v2_dark.png", full_page=True)

    print("Verification successful!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_blog(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error_v2.png")
        finally:
            browser.close()
