const app = require("../server");
const request = require("supertest")(app);
const expect = require("chai").expect;
const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const bcrypt = require("bcryptjs");
const sinon = require("sinon");
const signIn = require("../helpers/singIn");

let test = {
  username: "test123",
  password: "test456",
};
let token = null;

describe("My Recipe Test", () => {
  beforeEach((done) => {
    User.create({ username: "david", password: "aight" }, (err, user) => {});
    User.remove({ username: "test123" }, (err, data) => {
      if (err) {
        console.log("err removing the user", err);
        done(err);
      } else {
        console.log("successfully removed the user");
        //TODO:
        //have to remove the profile as well
        done();
      }
    });
  });
  it("POST request to /signin with correctly formatted body creates a user", (done) => {
    request
      .post("/signup")
      .send(test)
      .type("form")
      .end((err, res) => {
        User.findOne({ username: test.username }, (err, user) => {
          expect(err).to.be.null;
          expect(user).to.not.be.null;
          done();
        });
      });
  });
  it("POST request to /signin with incorrectly formatted body should not create new user", (done) => {
    request
      .post("/signup")
      .send({ username: "test123" })
      .type("form")
      .end((err, res) => {
        User.findOne({ username: test.username }, (err, user) => {
          expect(user).to.not.exist;
          done();
        });
      });
  });
  it("POST requet to /signin with incorrectly formatted body redirected to /sign in with err", (done) => {
    request
      .post("/signup")
      .send({ username: "test123" })
      .type("form")
      .end((err, res) => {
        expect(res.text.match(/Error/)).to.not.be.null;
        done();
      });
  });
  it("POST request to /signin with existing user should not create new user", (done) => {
    request
      .post("./signup")
      .send({ username: "david", password: "aight" })
      .type("form")
      .end((err, res) => {
        User.find({ username: "david" }, (err, users) => {
          expect(users.length).to.equal(1);
          done();
        });
      });
  });

  // it("POST request to /login with incorrectly formatted body redirects to /");
  // it("POST request to /login with incorrect password get redirected to /");
  // it("POST request to /login with incorrect username get redirected to /");
  // it("POST request to /login with existing user redirected to /app/home");

  it("POST request to /app/home/me with incorrectly formatted body does not update profile", (done) => {
    request
      .post("/signup")
      .send(test)
      .type("form")
      .end((err, res) => {
        let token = getCookieValue(res.headers["set-cookie"], "auth_token");
        request
          .post("/app/home/me")
          .set("x-auth-token", token)
          .send({ diet: null })
          .expect(400, done);
      });
  });

  it("GET request to /app/home/me always gets valid profile", (done) => {
    request
      .post("/signup")
      .send(test)
      .type("form")
      .end((err, res) => {
        let token = getCookieValue(res.headers["set-cookie"], "auth_token");
        request
          .get("/app/home/me")
          .set("x-auth-token", token)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.not.be.null;
            done();
          });
      });
  });
  it("unauth user will get redirected to login/sign on");
});

// describe("Unit 11 Test", () => {
//   beforeEach((done) => {
//     User.remove({}, () => {
//       Session.remove({}, () => {
//         User.create(
//           {
//             username: "david",
//             password: "aight",
//           },
//           (err, user) => {
//             id = user.id;
//           }
//         );
//         User.remove({ username: "test123" }, (err, data) => {
//           if (err) {
//             console.log("err in deleting user test", err);
//             done(err);
//           } else {
//             console.log("successfully delete user test");
//           }
//           done();
//         });
//       });
//     });
//   });
//   describe("JWT Auth", () => {
//     it("the user signs in have valid JWT token", (done) => {
//       request
//         .post("/signup")
//         .type("form")
//         .send({ username: "test123", password: "test456" })
//         .expect("set-cookie", /ssid=/, done);
//       // .end((err, res) => {
//       // console.log("res.headers", res.headers);
//       // let token = getCookieValue(res.headers["set-cookie"], "ssid");
//       // console.log("token intest", token);
//       // expect(signIn.verifyJWT(token)).to.be.true;
//       // done();
//       // });
//     });
//   });
//   describe("Bcrypting password tests", () => {
//     it("user created password is hashed before saving to db", (done) => {
//       request
//         .post("/signup")
//         .send({ username: "test123", password: "test456" })
//         .type("form")
//         .end((err, res) => {
//           User.findOne({ username: test.username }, (err, user) => {
//             expect(err).to.be.null;
//             expect(user).to.not.be.null;
//             expect(user.password).to.not.equal(test.password);
//             done();
//           });
//         });
//     });
//   });
// });

//OLD UNIT TEST:
// describe("Unit 10 Tests", () => {
//   let id;
//   let clock;

//   before(() => {
//     // clock = sinon.useFakeTimers();
//   });

//   beforeEach((done) => {
//     User.remove({}, () => {
//       Session.remove({}, () => {
//         User.create(
//           {
//             username: "david",
//             password: "aight",
//           },
//           (err, user) => {
//             id = user.id;
//             done();
//           }
//         );
//       });
//     });
//   });

//   after(() => {
//     // clock.restore();
//   });

//   describe("Creating users", () => {
//     it('POST request to "/signup" route with correctly formatted body creates a user', (done) => {
//       request
//         .post("/signup")
//         .send({ username: "test1", password: "password1" })
//         .type("form")
//         .end((err, res) => {
//           User.findOne({ username: "test1" }, (err, user) => {
//             expect(err).to.be.null;
//             expect(user).to.exist;
//             done();
//           });
//         });
//     });

//     it('POST request to "/signup" route with incorrectly formatted body should redirect to "/signup" with an error message', (done) => {
//       request
//         .post("/signup")
//         .send({ username: "test2" })
//         .type("form")
//         .end((err, res) => {
//           expect(res.text.match(/Error/)).to.not.be.null;
//           done();
//         });
//     });

//     it('POST request to "/signup" route with incorrectly formatted body does not create a new User', (done) => {
//       request
//         .post("/signup")
//         .send({ username: "test2" })
//         .type("form")
//         .end((err, res) => {
//           User.findOne({ username: "test2" }, (err, user) => {
//             expect(user).to.not.exist;
//             done();
//           });
//         });
//     });
//   });

//   describe("Authenticating users", () => {
//     it('POST request to "/login" route with correctly formated correct information redirects to "/secret"', (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "aight" })
//         .end((err, res) => {
//           expect(res.headers.location).to.eql("/secret");
//           done();
//         });
//     });

//     it('POST request to "/login" route with incorrect password redirects to "/signup"', (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "incorrect" })
//         .end((err, res) => {
//           expect(res.headers.location).to.eql("/signup");
//           done();
//         });
//     });

//     it('POST request to "/login" route with non-existent user redirects to "/signup"', (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "idontexist", password: "aight" })
//         .end((err, res) => {
//           expect(res.headers.location).to.eql("/signup");
//           done();
//         });
//     });
//   });

//   describe("Cookies", () => {
//     it('Header has cookie name of "codesmith"', (done) => {
//       request.get("/").expect("set-cookie", /codesmith=/, done);
//     });

//     it('"codesmith" cookie has value of "hi"', (done) => {
//       request.get("/").expect("set-cookie", /hi/, done);
//     });

//     it('Header has a cookie name "secret"', (done) => {
//       request.get("/").expect("set-cookie", /secret=/, done);
//     });

//     it('"secret" cookie has a random value from 0-99', (done) => {
//       let oldNumber;
//       let newNumber;
//       let cookies;
//       request.get("/").end((err, res) => {
//         oldNumber = parseInt(getCookie(res.headers["set-cookie"], "secret"));
//         request.get("/").end((err, res) => {
//           newNumber = parseInt(getCookie(res.headers["set-cookie"], "secret"));
//           expect(newNumber).to.be.within(0, 99);
//           expect(oldNumber).to.be.within(0, 99);
//           expect(newNumber).to.not.eql(oldNumber);
//           done();
//         });
//       });
//     });

//     it('Header has a cookie named "ssid" when a user successfully logins', (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "aight" })
//         .expect("set-cookie", /ssid=/, done);
//     });

//     it('"ssid" cookie is HttpOnly', (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "aight" })
//         .expect("set-cookie", /HttpOnly/, done);
//     });

//     it('Header has a cookie named "ssid" when a user successfully signs up', (done) => {
//       request
//         .post("/signup")
//         .type("form")
//         .send({ username: "newuser", password: "cool" })
//         .expect("set-cookie", /ssid=/, done);
//     });

//     it('"ssid" cookie has value equal to the id of the user', (done) => {
//       const regex = new RegExp(id);
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "aight" })
//         .expect("set-cookie", regex, done);
//     });
//   });

//   describe("Sessions", () => {
//     it("Creates a session when a user successfully creates an account", (done) => {
//       request
//         .post("/signup")
//         .type("form")
//         .send({ username: "test2", password: "password2" })
//         .end((err, res) => {
//           User.findOne({ username: "test2" }, (err, user) => {
//             Session.findOne({ cookieId: user._id }, (err, session) => {
//               expect(err).to.be.null;
//               expect(session).to.exist;
//               done();
//             });
//           });
//         });
//     });

//     it("Creates a session when a user successfully logins to an account", (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "aight" })
//         .end((err, res) => {
//           User.findOne({ username: "david" }, (err, user) => {
//             Session.findOne({ cookieId: user._id }, (err, session) => {
//               expect(err).to.be.null;
//               expect(session).to.exist;
//               done();
//             });
//           });
//         });
//     });

//     it("Does not create a session if login unsuccessful", (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "wrong password" })
//         .end((err, res) => {
//           User.findOne({ username: "david" }, (err, user) => {
//             Session.findOne({ cookieId: user._id }, (err, session) => {
//               expect(err).to.be.null;
//               expect(session).to.not.exist;
//               done();
//             });
//           });
//         });
//     });
//   });

//   describe("Authorizing users", () => {
//     it('Block "/secret" if session not active', (done) => {
//       request.get("/secret").end((err, res) => {
//         expect(res.text).to.not.include("Secret");
//         expect(res.text).to.not.include("david");
//         done();
//       });
//     });

//     it('Redirects from "/secret" to "/signup" if session not active', (done) => {
//       request
//         .get("/secret")
//         .expect(302)
//         .end((err, res) => {
//           expect(res.headers.location).to.eql("/signup");
//           done();
//         });
//     });

//     it('Allows access to "/secret" if session active', (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "aight" })
//         .end((err, res) => {
//           const cookie = res.headers["set-cookie"][0].split(";")[0];

//           request
//             .get("/secret")
//             .set("Cookie", cookie)
//             .expect(200)
//             .end((err, res) => {
//               expect(res.text).to.contain("Secret");
//               expect(res.text).to.contain("david");
//               done(err);
//             });
//         });
//     });

//     it('Should not be able to access "/secret" after session expires', (done) => {
//       request
//         .post("/login")
//         .type("form")
//         .send({ username: "david", password: "aight" })
//         .end((err, res) => {
//           Session.remove({ cookieId: id }, (err, session) => {
//             request
//               .get("/secret")
//               .expect(302)
//               .end((err, res) => {
//                 expect(res.headers.location).to.eql("/signup");
//                 done();
//               });
//           });
//         });
//     });
//   });

//   describe("Bcrypting passwords", () => {
//     it("Passwords should not be stored in plaintext", (done) => {
//       request
//         .post("/signup")
//         .send({ username: "test3", password: "password3" })
//         .type("form")
//         .end((err, res) => {
//           User.findOne({ username: "test3" }, (err, user) => {
//             expect(user.password).to.not.eql("password3");
//             done();
//           });
//         });
//     });

//     it("Passwords be bcrypted", (done) => {
//       request
//         .post("/signup")
//         .send({ username: "test4", password: "password4" })
//         .type("form")
//         .end((err, res) => {
//           User.findOne({ username: "test4" }, (err, user) => {
//             expect(bcrypt.compareSync("password4", user.password)).to.be.true;
//             done();
//           });
//         });
//     });

//     it("Bcrypts passwords in Mongoose middleware, not in userController", (done) => {
//       User.create({ username: "petri", password: "aight" }, (err, user) => {
//         expect(user.password).to.not.eql("aight");
//         expect(bcrypt.compareSync("aight", user.password)).to.be.true;
//         done();
//       });
//     });
//   });
// });

function getCookieValue(cookie) {
  return cookie[0].split(";")[0].split("=")[1];
}

function getCookie(cookieArray, name) {
  return getCookieValue(
    cookieArray.filter((el) => {
      return el.split(";")[0].split("=")[0] === name;
    })
  );
}
