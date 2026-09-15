## HTTP methods/requests
- GET - used to read the data from the server
- POST - is primarily used to create a resource or submit data for processing. It can also cause a modification
- PUT - used to update the complete resource of the server and usually represents complete replacement and is intended to be idempotent
- PATCH - used to update the partial resource of the server i.e. it applies a partial modification and is not guaranteed to be idempotent
- DELETE - used to delete/erase the resource from the server

## HTTP status codes - returned by HTTP requests

- 200: Success (OK)
- 201: Created
- 204: No content (No body) (doesn't specifically mean deletion)
- 301: Redirected (Permanently redirected) (resource moved permanently to another URL)
- 400: Bad request
- 401: Unauthorized (authentication is missing or failed)
- 403: Forbidden (client is authenticated but lacks permission)
- 404: Not found (resource not present)
- 500: Internal server error
- 503: Service unavailable (temporarily)

## API definition
- Application Programming Interface (API) is something that exposes and lets clients interact with resources through specialized urls (endpoints) and clients can operate on the resources by using HTTP requests on these endpoints.

## Playwright API syntax pattern

``test.describe('test suite', () => {
    test('API test', async ({ request }) => {
        const response = await request.post("endpoint", { data: {firstname: 'Arun', lastname: 'Tester'}});
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty("PropertyName");
        expect(responseBody).toBeInstanceOf(Array);
        expect(responseBody.user.bookingDate).toBe("yyyy-mm-dd");
    });
});``

## Postman assertion pattern

> test syntax:
- `pm.test('test name', () => {
//code or assertions });`
> status code:
- `pm.response.to.have.status(200);`
> checking if the object is array:
- `pm.expect(pm.response.json()).to.be.an("array");`
> asserting the property present or not:
- `pm.expect(pm.response.json()).to.have.property('bookingid');`
> validating a value of some property:
- `pm.expect(pm.response.json().user.username).to.eql("xyz_user");`

## Interview answers/definitions I remember

1. REST is a design style of API which exposes resource through endpoints (special url) and we can use HTTP requests on those endpoints to operate on the response.
2. API setup helps us create the prerequisite data/authentication state, which would otherwise have taken unnecessary steps and time from ui steps; so that ui test can start from the required state and focus completely on the behavior/function under test.
3. PUT updates the resource completely with the data which we sent in request payload; whereas PATCH updates the resource only with the part we have sent in request payload, without touching the unmentioned fields.
4. An endpoint is the URL through which a resource is accessed. 
5. A path parameter is a dynamic value in the path, such as 42 in /users/42; 
6. A query parameter follows ?, such as page=2.
7. Headers carry metadata or control information; the body carries the request payload.