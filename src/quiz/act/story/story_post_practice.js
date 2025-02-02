import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../css/quiz.css";

function Story_post_practice(scene, act) {
  const [targetText, settargetText] = useState("story_text_1");
  const [targetImg, settargetImg] = useState("story_image_1");
  const location = useLocation();
  const { quizData } = location.state; // รับค่า quizData จาก state
  const { act_count } = location.state;
  const story = quizData[act_count].choose_path.post_practice.correct_path; // จัดการ act ด้วย

  useEffect(() => {
    settargetText("story_text_" + scene.scene_number);
    settargetImg("story_image_" + scene.scene_number);
  }, [scene]);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div className="story_container">
            post
            <div className="story_action">
              <img
                src={story.story_image[targetImg]}
                alt=""
                className="story-image"
              />
            </div>
            <div className="story_text">{story.story_text[targetText]}</div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default Story_post_practice;
