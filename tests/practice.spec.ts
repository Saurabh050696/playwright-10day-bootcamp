import { test, expect } from '@playwright/test';

test.describe('Playwright api drill', () => {
    test('practice test 1', async ({ request }) => {
        const resp = await request.get("https://restful-booker.herokuapp.com/booking");
        expect(resp.status()).toBe(200);
        const jsonBody = await resp.json();
        expect(jsonBody).toBeInstanceOf(Array);
        expect(jsonBody.length).toBeGreaterThan(0);
    });

    test('Practice test 2 (booking request)', async ({ request }) => {
        const response = await request.post("https://restful-booker.herokuapp.com/booking", {
            data: {
                "firstname": "Arun",
                "lastname": "Tester",
                "totalprice": 150,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2026-09-14",
                    "checkout": "2026-09-20"
                },
                "additionalneeds": "Breakfast"
            }
        });
        expect(response.status()).toBe(200);
        const jsonResponseBody = await response.json();
        expect(jsonResponseBody).toHaveProperty("bookingid");
        expect(jsonResponseBody.booking.firstname).toBe("Arun");
    });
});