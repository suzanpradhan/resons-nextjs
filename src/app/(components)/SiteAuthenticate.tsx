'use client';

const SiteAuthenticate = ({ password, setPassword, handlePasswordCheck }: { password: string, setPassword: (v: string) => void, handlePasswordCheck: () => void; }) => {

    return (
        <>
            <div className="max-w-3xl w-full shadow-s flex flex-col max-full relative flex-1 overflow-y-scroll" id="detailScroller"></div>
            <div className="login-container">
                <div className="login-box">
                    <h2>Enter Your Password for Login</h2>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button onClick={handlePasswordCheck} className='hover:shadow-lg loginButton'>Login</button>
                </div>
            </div>
        </>
    );

}

export default SiteAuthenticate;