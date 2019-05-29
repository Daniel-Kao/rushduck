import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">冲鸭小分队</h1>
          <p className="lead">愉快、热情、不分你我</p>
          <div className="buttons">
            <a className="btn btn-primary">Sign Up</a>
            <a className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
