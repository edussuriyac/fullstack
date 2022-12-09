describe("Blog ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.contains("log in to application");
    //   cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  });
  it("login form can be opened", function () {
    cy.contains("login");
  });

  it("user can log in", function () {
    cy.contains("login");
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();

    cy.contains("mluukkai logged in");
  });

  it.only("login fails with wrong password", function () {
    cy.contains("login");
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("wrong username or password");
    cy.get(".error")
      .should("contain", "wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Matti logged in");
  });
});
