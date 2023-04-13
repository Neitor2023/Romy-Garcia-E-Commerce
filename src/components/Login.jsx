import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    
    axios
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Uups...',
            text: 'Credenciales incorrectas'
          })          
        } else {
          console.log(error.response?.data);
        }
      });
  };

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {token ?
        <div style={{ maxWidth: 500, margin: "1rem auto", border: "1px solid black", padding: "1rem" }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBqyOAjrqSxuXrqgZCuMHpPdXIKVKLgm1PzS3TMykG&s" alt="" />
          <Button onClick={logout}>Cerrar sesión</Button>
        </div>
        :
        <Form
          style={{
            maxWidth: 500,
            margin: "1rem auto",
            border: "1px solid black",
            padding: "1rem"
          }}
          onSubmit={handleSubmit(submit)}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <h5 className="capitalize">
                Welcome! Enter yuor email and password to continue
              </h5>
              <br />
              <div className="test_data">
                <h5 className="capitalize"> <strong> Test data</strong></h5>
                <div className="test">
                  <i className='bx bx-envelope bx-sm'></i>romy@gmail.com
                </div>
                <div className="test">
                  <i className='bx bx-lock-alt bx-sm'></i>123
                </div>
              </div>
              <br />

              Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Iniciar sesión
          </Button>
        </Form>
      }
    </>
  );
};

export default Login;
