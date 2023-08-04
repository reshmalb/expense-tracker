import { useState } from "react";
import axios from "axios";
import "./userSignup.css";

const UserSignUp = (props) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
	});
	const [signInData, setSignInData] = useState({
		username: "",
		password: "",
	});
	const [isSignIn, setSignIn] = useState(true);
	const [isUserExists, setUserExists] = useState(false);
	const [isUserExistsforSignin, setUserExistsforSignin] = useState(true);
    const [isCorrectPassword,setCorrectPassword]=useState(true)
    const [isError,setError]=useState('')

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
	const handleSignInChange = (event) => {
		setUserExists(false)
		const { name, value } = event.target;
		setSignInData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
	const handleSignInSubmit =async(event) => {
		setUserExistsforSignin(true)
		setCorrectPassword(true);
		event.preventDefault();   
          try{
            const resp= await   axios
            .post("http://localhost:3000/user/signin", {
              username: signInData.username,
              password: signInData.password,
            })
            if(resp.status===200){
				setCorrectPassword(true);
				setUserExistsforSignin(true)
				props.isUserSignedIn=true;
                alert(resp.data.message)		
            }     

          }catch(error){
			if(error.response.status===400){
				setCorrectPassword(false);
				alert(error.response.data.message)
			}
			else if(error.response &&error.response.status===404){
				setUserExistsforSignin(false)
				alert(error.response.data.message)
			}
			else
			 if(error.response &&error.response.status===500){
				alert(error.response.data.message)

			}
          }

        }
    
   
	
	

	const handleSubmit = async (event) => {
		setUserExists(false)
		event.preventDefault();
        try{
			const response= await	axios.post("http://localhost:3000/user/signup", {
				name: formData.name,
				email: formData.email,
				username: formData.username,
				password: formData.password,
			})
			console.log("response",response)
			setFormData({
				name: "",
				email: "",
				username: "",
				password: "",
			});
			if(response.status===200){
				setUserExists(false);
				alert(response.data.message)
			}
		}catch(error){
			console.log("error",error)
			console.log("error",error.response)
			console.log("error",error.response.status)
			if(error.response.status===403){
				setUserExists(true);
			}
			else if(error.response.status===500){
				setUserExists(false);
				setError(error.response.data.message)
				setFormData({
					name: "",
					email: "",
					username: "",
					password: "",
				});
			}
          

			
		}
	  
	}
	const handleAccount = () => {
		setSignIn((prev) => !prev);
	};

	return (
		<div className="signup-container">
			{!isSignIn && (
				<form onSubmit={handleSubmit} className="form-signup">
					<h4 style={{ marginLeft: "70px" }}>
						{isSignIn ? "SignIn" : "SignUp"}{" "}
					</h4>

					<div className="form-items">
						<label className="form-label">Name:</label>

						<input
							className="form-input"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-items">
						<label className="form-label">Email:</label>

						<input
							className="form-input"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-items">
						<label className="form-label">Username:</label>

						<input
							className="form-input"
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-items">
          {isUserExists && (<p style={{color:"red",fontSize:"10px"}}>User already exists..</p>)}
         </div>

					<div className="form-items">
						<label className="form-label">Password:</label>

						<input
							className="form-input"
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-items">
						<button className="signup-button" type="submit">
							Sign Up
						</button>
						{isError && (<p style={{color:"red",fontSize:"10px"}}>Something went wrong . Try later..</p>)}
					</div>
				</form>
			)}
			{isSignIn && (
				<form onSubmit={handleSignInSubmit} className="form-signup">
					<h4 style={{ marginLeft: "70px" }}>
						{isSignIn ? "SignIn" : "SignUp"}{" "}
					</h4>

					<div className="form-items">
						<label className="form-label">Username:</label>

						<input
							className="form-input"
							type="text"
							name="username"
							value={signInData.username}
							onChange={handleSignInChange}
							required
						/>
            {!isUserExistsforSignin &&(<p style={{fontSize:"10px"}}>Invalid username</p>)}
					</div>
					<div className="form-items">
						<label className="form-label">Password:</label>

						<input
							className="form-input"
							type="password"
							name="password"
							value={signInData.password}
							onChange={handleSignInChange}
							required
						/>
            {!isCorrectPassword &&(<p style={{fontSize:"10px"}}>Incorrect password</p>)}

					</div>
					<div className="form-items">
						<button className="signup-button" type="submit">
							SignIn
						</button>
					</div>
				</form>
			)}

			<div className="login-link">
				<p>
					<a href="#signin" onClick={handleAccount}>
						{isSignIn ? "SignUp" : "SignIn"}
					</a>
					with your existing account
				</p>
			</div>
		</div>
	);
};

export default UserSignUp;
