import axios from "axios";

function Login({ nextPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextPage();
  };

  const Login =async()=>{
    const result =await axios.post("http://localhost:8080/auth/login",
    {
      username:username,
      password:password
    }
  );

  console.log(result.data);
  }

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input  type="email" placeholder="Enter Email" required />

        <input type="password" placeholder="Enter Password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;