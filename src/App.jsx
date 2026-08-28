import { useEffect, useState } from "react";
import "./App.css";

const initialMap =
  "https://www.figma.com/api/mcp/asset/1cb77278-44c9-44b2-bd36-ba2f48b6008b.png";

const preciseIcon =
  "https://www.figma.com/api/mcp/asset/92a2bc94-d463-4d26-b87a-35f8ed0d4f10.svg";

const defaultAvatar =
  "https://www.figma.com/api/mcp/asset/34c7c96c-e136-4cf1-9d8a-5918c1b29c8e.svg";

const defaultCar =
  "https://www.figma.com/api/mcp/asset/2427b2b6-383b-4532-a129-b5bffbd940cd.png";

const homeMap =
  "https://www.figma.com/api/mcp/asset/df763cbc-38e6-486a-8888-849bb8dcd4f8.png";

const homeAvatar =
  "https://www.figma.com/api/mcp/asset/468bc1c4-4173-44a5-b706-3a958b56c200.png";


/* =========================================================
   DEMO NAV
========================================================= */

function DemoNav({ page, setPage }) {
  const pageNames = {
    location: "Location Permission",
    splash: "Splash",
    auth: "Sign Up / Log In",
    personal: "Personal Details",
    vehicle: "Vehicle Details",
    home: "Home",
  };

  const goToPage = (e) => {
    const nextPage = e.target.value;

    if (nextPage === "location") setPage("location");
    if (nextPage === "splash") setPage("splash");
    if (nextPage === "auth") setPage("auth");
    if (nextPage === "personal") setPage("personal");
    if (nextPage === "vehicle") setPage("vehicle");
    if (nextPage === "home") setPage("home");
  };

  return (
    <nav className="demo-nav">
      <div className="demo-brand">
        🚗 <strong>RoadHero</strong>
      </div>

      <div className="demo-badge">DEMO</div>

      <span className="demo-page-label">Page</span>

      <select value={page} onChange={goToPage}>
        {Object.entries(pageNames).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="demo-path">/{page}</div>
    </nav>
  );
}


/* =========================================================
   LOCATION PERMISSION
========================================================= */

function LocationPermission({ onAllow }) {
  return (
    <section className="screen initial-screen">
      <div className="initial-tagline">
        <div>Your Roadside</div>
        <div>Hero, Anytime.</div>
      </div>

      <div className="initial-logo">RoadHero</div>

      <div className="location-alert">
        <div className="location-alert-copy">
          <div className="location-title">
            <div>Allow “App” to use</div>
            <div>your location?</div>
          </div>

          <p>
            Your precise location is used to show your position on the map, get
            directions, estimate travel times and improve search results
          </p>
        </div>

        <div className="location-map">
          <img src={initialMap} alt="" />

          <div className="precise-chip">
            <img src={preciseIcon} alt="" />
            <span>Precise: On</span>
          </div>
        </div>

        <div className="location-options">
          <button onClick={onAllow}>Allow Once</button>
          <button onClick={onAllow}>
            Allow While Using the App
          </button>
          <button type="button">Don’t Allow</button>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   SPLASH
========================================================= */

function Splash({ onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1500);

    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <section className="screen first-page">
      <div className="first-page-logo">RoadHero</div>

      <div className="first-page-tagline">
        <div>Your Roadside</div>
        <div>Hero, Anytime.</div>
      </div>
    </section>
  );
}


/* =========================================================
   AUTH
========================================================= */

function Auth({ onSignup, onLogin }) {
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = mode === "signup";

  const ready = signup
    ? Boolean(email.trim())
    : Boolean(email.trim() && password);

  const submit = () => {
    if (!ready) return;

    if (signup) {
      onSignup(email.trim());
    } else {
      onLogin(email.trim());
    }
  };

  return (
    <section className="screen auth-screen">
      <div className="auth-logo">RoadHero</div>

      <div className="auth-content">
        <div className="auth-switch">
          <div className="auth-switch-line" />

          <button
            className={signup ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setPassword("");
            }}
          >
            Sign Up
          </button>

          <button
            className={!signup ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Log In
          </button>
        </div>

        <div className="auth-copy">
          <div className="auth-welcome">
            {signup ? "Welcome to us," : "Welcome back"}
          </div>

          <div className="auth-subtitle">
            {signup
              ? "Hello there, create New Account"
              : "Hello there, sign in to continue"}
          </div>
        </div>

        <div className="auth-form">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
            type="email"
          />

          {!signup && (
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
            />
          )}

          <button
            className={`auth-submit ${ready ? "ready" : ""}`}
            disabled={!ready}
            onClick={submit}
          >
            {signup ? "Continue" : "Sign In"}
          </button>
        </div>

        <div className="auth-terms">
          {signup
            ? "By clicking continue, you agree to our "
            : "By clicking sign in, you agree to our "}
          <span>Terms of Service</span>
          {" and "}
          <span>Privacy Policy</span>
        </div>
      </div>

      <div className="mechanic-link">
        <span>Are you an mechanic?</span>

        <button
          onClick={() =>
            alert("TBC!")
          }
        >
          Click Here
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   DETAIL FIELD
========================================================= */

function DetailField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <label className="detail-field">
      <span className="detail-label">
        {label}
        <em>*</em>
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}


/* =========================================================
   PERSONAL DETAILS
========================================================= */

function PersonalDetails({
  user,
  setUser,
  onContinue,
}) {
  const [avatar, setAvatar] = useState(user.avatar || "");

  const chooseAvatar = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setAvatar(url);

    setUser((prev) => ({
      ...prev,
      avatar: url,
    }));
  };

  const valid =
    user.name.trim() &&
    user.phone.trim() &&
    user.gender.trim() &&
    user.password &&
    user.confirmPassword &&
    user.password === user.confirmPassword;

  return (
    <section className="screen detail-screen">
      <div className="detail-sheet" />

      <div className="detail-heading">
        <div>Step 1 of 2</div>
        <h1>Personal Details</h1>
      </div>

      <div className="profile-photo">
        <img
          src={avatar || defaultAvatar}
          alt="Profile"
        />

        <label className="photo-plus">
          +
          <input
            type="file"
            accept="image/*"
            onChange={chooseAvatar}
          />
        </label>
      </div>

      <div className="detail-card personal-card">
        <DetailField
          label="Name - Surname"
          value={user.name}
          onChange={(v) =>
            setUser((p) => ({
              ...p,
              name: v,
            }))
          }
        />

        <DetailField
          label="Phone Number"
          value={user.phone}
          onChange={(v) =>
            setUser((p) => ({
              ...p,
              phone: v,
            }))
          }
          type="tel"
        />

        <DetailField
          label="Gender"
          value={user.gender}
          onChange={(v) =>
            setUser((p) => ({
              ...p,
              gender: v,
            }))
          }
        />

        <DetailField
          label="Password"
          value={user.password}
          onChange={(v) =>
            setUser((p) => ({
              ...p,
              password: v,
            }))
          }
          type="password"
        />

        <DetailField
          label="Confirm Password"
          value={user.confirmPassword}
          onChange={(v) =>
            setUser((p) => ({
              ...p,
              confirmPassword: v,
            }))
          }
          type="password"
        />

        <button
          className={`detail-submit ${
            valid ? "ready" : ""
          }`}
          disabled={!valid}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   VEHICLE DETAILS
========================================================= */

function VehicleDetails({
  car,
  setCar,
  onDone,
}) {
  const [carPhoto, setCarPhoto] = useState(
    car.image || ""
  );

  const chooseCar = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setCarPhoto(url);

    setCar((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const valid =
    car.license.trim() &&
    car.make.trim() &&
    car.model.trim() &&
    car.year.trim() &&
    car.color.trim();

  return (
    <section className="screen detail-screen vehicle-detail-screen">
      <div className="detail-sheet" />

      <div className="detail-heading">
        <div>Step 2 of 2</div>
        <h1>Vehicle Details</h1>
      </div>

      <div className="vehicle-photo">
        <img
          src={carPhoto || defaultCar}
          alt="Vehicle"
        />

        <label className="photo-plus">
          +
          <input
            type="file"
            accept="image/*"
            onChange={chooseCar}
          />
        </label>
      </div>

      <div className="detail-card vehicle-card">
        <DetailField
          label="License Plate Number"
          value={car.license}
          onChange={(v) =>
            setCar((p) => ({
              ...p,
              license: v,
            }))
          }
        />

        <DetailField
          label="Make"
          value={car.make}
          onChange={(v) =>
            setCar((p) => ({
              ...p,
              make: v,
            }))
          }
        />

        <DetailField
          label="Model"
          value={car.model}
          onChange={(v) =>
            setCar((p) => ({
              ...p,
              model: v,
            }))
          }
        />

        <DetailField
          label="Year"
          value={car.year}
          onChange={(v) =>
            setCar((p) => ({
              ...p,
              year: v,
            }))
          }
        />

        <DetailField
          label="Color"
          value={car.color}
          onChange={(v) =>
            setCar((p) => ({
              ...p,
              color: v,
            }))
          }
        />

        <button
          className={`detail-submit ${
            valid ? "ready" : ""
          }`}
          disabled={!valid}
          onClick={onDone}
        >
          Done
        </button>
      </div>
    </section>
  );
}


/* =========================================================
   HOME
========================================================= */

function Home({ user, car }) {
  const firstName =
    user.name?.trim()?.split(/\s+/)[0] || "John";

  const carTitle =
    [car.make, car.model, car.year]
      .filter(Boolean)
      .join(" ") ||
    "Toyota Camry Premium 2025";

  const address =
    "Crystal Design Center, 888 Pradit Manutham Road Khlong Chan, Bang Kapi, Bangkok 10240, Thailand";

  return (
    <section className="screen home-screen">

      {/* Blue header */}
      <div className="home-header">
        <div className="home-profile">

          <img
            src={user.avatar || homeAvatar}
            alt=""
          />

          <div className="home-profile-copy">
            <h1>Hi, {firstName}.</h1>
            <p>How can we help?</p>
          </div>

          <button className="home-more">
            ⋮
          </button>

        </div>
      </div>


      {/* White content sheet */}
      <div className="home-sheet">

        <div className="home-content">

          {/* ================= CAR ================= */}
          <div className="home-card home-car-card">

            <div className="home-card-head">
              <span>Your Car</span>

              <button>
                Edit
              </button>
            </div>

            <h2>
              {carTitle}
            </h2>

            <div className="home-car-media">
              <img
                src={car.image || defaultCar}
                alt={carTitle}
              />
            </div>

          </div>


          {/* ================= LOCATION ================= */}
          <div className="home-card location-card">

            <div className="home-card-head">
              <span>
                Your Current Location
              </span>

              <button>
                Edit
              </button>
            </div>

            <img
              className="home-location-map"
              src={homeMap}
              alt=""
            />

            <div className="home-address">

              <span className="address-icon">
                ⚐
              </span>

              <p>
                {address}
              </p>

            </div>

          </div>


          {/* ================= SERVICES ================= */}

          <h2 className="services-heading">
            Services
          </h2>

          <div className="services-list">

            <button>
              Request a Technician
            </button>

            <button>
              Request a Tow Truck
            </button>

            <button>
              Others
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  const [page, setPage] = useState("location");

  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const [car, setCar] = useState({
    license: "",
    make: "",
    model: "",
    year: "",
    color: "",
    image: "",
  });

  return (
    <main className="app">

      <DemoNav
        page={page}
        setPage={setPage}
      />

      <div className="app-stage">

        <div className={`phone-shell page-${page}`}>

          {page === "location" && (
            <LocationPermission
              onAllow={() =>
                setPage("splash")
              }
            />
          )}

          {page === "splash" && (
            <Splash
              onDone={() =>
                setPage("auth")
              }
            />
          )}

          {page === "auth" && (
            <Auth
              onSignup={(email) => {
                setUser((prev) => ({
                  ...prev,
                  email,
                }));

                setPage("personal");
              }}

              onLogin={(email) => {
                setUser((prev) => ({
                  ...prev,
                  email,
                }));

                setPage("home");
              }}
            />
          )}

          {page === "personal" && (
            <PersonalDetails
              user={user}
              setUser={setUser}
              onContinue={() =>
                setPage("vehicle")
              }
            />
          )}

          {page === "vehicle" && (
            <VehicleDetails
              car={car}
              setCar={setCar}
              onDone={() =>
                setPage("home")
              }
            />
          )}

          {page === "home" && (
            <Home
              user={user}
              car={car}
            />
          )}

        </div>

      </div>
    </main>
  );
}

export default App;2