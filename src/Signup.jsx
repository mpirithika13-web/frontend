import axios from "axios";
function Signup({ nextPage }) {
  const handleSubmit = (e) => { e.preventDefault(); nextPage();
  };
const Signup =async()=>{
    const result =await axios.post("http://localhost:8080/auth/signup",
    {
      username:username,
      email:email,
      password:password
    }
  );
  console.log(result.data);
  }

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h1>Signup</h1>

        <input type="text"  placeholder="Enter Name" required />

        <input type="email" placeholder="Enter Email" required />

        <input type="password" placeholder="Create Password" required/>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;