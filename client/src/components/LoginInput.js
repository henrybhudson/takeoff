import React from 'react';

const LoginInput = (props) => {
        return (
                <div class={"input-container-" + props.type}>
                        <input
                                type={props.type == "email" ? "text" : "password"}
                                placeholder={props.type}
                                class="input"
                                onChange={(e) => props.handler(e.target.value)}
                        />
                </div>
        );
};

export default LoginInput;