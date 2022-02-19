import React from "react";
import { Header, ContentContainer } from "./contact.styles";
const Contacts = () => (
  <>
    <Header>Follow our social platforms </Header>

    <section style={{ marginTop: -50 }} className="contact " id="contact">
      <div className="container">
        <ul className="list-inline list-social">
          <li className="list-inline-item social-twitter">
            <a target="__blank" href="https://twitter.com/solomonyunana5">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item social-facebook">
            <a
              target="__blank"
              href="https://www.facebook.com/solomon.yunana.16"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="list-inline-item social-google-plus">
            <a
              target="__blank"
              href="https://www.instagram.com/solomonyunana95/"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </>
);
export default Contacts;
