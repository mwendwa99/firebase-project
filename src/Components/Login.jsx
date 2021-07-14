import React from 'react'

const Login = ({ email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAcc,
    setHasAcc,
    emailError,
    passwordError }) => {

    // const [email,
    //     setEmail,
    //     password,
    //     setPassword,
    //     handleLogin,
    //     handleSignup,
    //     hasAcc, setHasAcc,
    //     emailError,
    //     passwordError] = props
    return (
        <section className="login">
            <div className="loginContainer">
                <label>username</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg"> {emailError} </p>
                <label> password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg"> {passwordError} </p>
                <div className="btnContainer">
                    {hasAcc ? (
                        <>
                            <button onClick={handleLogin} >Login</button>
                            <p>don't have an account? <span onClick={() => setHasAcc(!hasAcc)} >Signup</span> </p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup} > Signup </button>
                            <p>have an account?<span onClick={() => setHasAcc(!hasAcc)} >Login</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;
