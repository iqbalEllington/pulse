import React from "react";
import style from "./style.module.scss";

const Providers = () => {
  return (
    <>
      <div className="d-flex mt-5 justify-content-between">
        <h5>
          <strong>GEMS Dubai American Academy : Providers</strong>
        </h5>
        <button class="px-3 btn btn-primary">Back</button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-md-5">
          <div className="right-side">
            <ul>
              <li>
                <h2>
                  <strong>Trading Name:</strong>
                </h2>
              </li>
              <li>
                <p>DAA-SCHOOL PROVIDER(School's Provider)</p>
              </li>
              <li>
                <p>ESPERIA VOLLYEYBALL ACADEMY</p>
              </li>
              <li>
                <p>ABSOLUTE GYMNASTICS</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={style["box"]}>
        <h5 class="form-label mb-4">
          <strong>Link Providers</strong>
        </h5>
        <h5 class="form-label mt-4 text">
          <strong>Non Linked:</strong>
        </h5>
        <div className="d-flex gap-5">
          <div className="col-md-7">
            <div className="right-side">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Search"
                  class="form-control py-4"
                />
              </div>
              <ul class={style["hvr"]}>
                <li>AASHYA EDUCATIONS</li>
                <li>ASCENTRIA-PACE</li>
                <li>AUFOQ ALEBDAA LEARNINGS & TRAINING CENTRE</li>
                <li>CREATIVE ROBOTICS TALENT DEVELOPMENT</li>
                <li>ESPORTS WORLD ACADEMY</li>
                <li>ETON INSTITUTE</li>
              </ul>
            </div>
          </div>

          <div className="col-md-7 box-two">
            <div className="">
              <div className="right-side">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Search"
                    class="form-control py-4"
                  />
                </div>
                <ul class={style["hvr"]}>
                  <li>AASHYA EDUCATIONS</li>
                  <li>ASCENTRIA-PACE</li>
                  <li>AUFOQ ALEBDAA LEARNINGS & TRAINING CENTRE</li>
                  <li>CREATIVE ROBOTICS TALENT DEVELOPMENT</li>
                  <li>ESPORTS WORLD ACADEMY</li>
                  <li>ETON INSTITUTE</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Providers;
