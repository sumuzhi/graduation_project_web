import React, { Component } from 'react';
import { Row, Col, Button, Input, TextArea } from '@douyinfe/semi-ui';
import { connect } from 'react-redux'
import Icon, { IconUserCardVideo, IconUserCardPhone, IconSend, IconMicrophone, IconList, IconLive, IconSetting } from '@douyinfe/semi-icons';


import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
class index extends Component {

  state = {
    height: 30
  }

  componentDidMount() {
    console.log(this.props.screenHeight);
  }

  reSettingHeight = ({ height }) => {
    console.log(height);
    this.setState({ height })
  }


  render() {
    return (
      <div >
        <Row>
          <div className="py-2 px-4 d-none d-lg-block">
            <div className="d-flex align-items-center py-1">
              <div className="position-relative" >
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
              </div>
              <div className="flex-grow-1 pl-3">
                <strong>Sharon Lessman</strong>
                <div className="text-muted small"><em>Typing...</em></div>
              </div>
              <div className='headerIcon'>
                <IconUserCardPhone
                />
                <IconUserCardVideo />
                <IconList />
              </div>
            </div>
          </div>
          <Col span={4}></Col>

          <Col span={14}>

            <div className="position-relative ">
              <div className="chat-messages p-4 lightscrollbar" style={{ height: this.props.screenHeight - 120 - this.state.height }}>

                <div className="chat-message-right pb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div className="font-weight-bold mb-1">You</div>
                    Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                  </div>
                </div>

                <div className="chat-message-right mb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:38 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div className="font-weight-bold mb-1">You</div>
                    Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                  </div>
                </div>

                <div className="chat-message-left pb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:39 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div className="font-weight-bold mb-1">Sharon Lessman</div>
                    Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
                  </div>
                </div>

                <div className="chat-message-right mb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:40 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div className="font-weight-bold mb-1">You</div>
                    Cum ea graeci tractatos.
                  </div>
                </div>

                <div className="chat-message-right mb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:41 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div className="font-weight-bold mb-1">You</div>
                    Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.
                  </div>
                </div>

                <div className="chat-message-left pb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:42 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div className="font-weight-bold mb-1">Sharon Lessman</div>
                    111
                  </div>
                </div>

                <div className="chat-message-right mb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:43 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div className="font-weight-bold mb-1">You</div>
                    Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                  </div>
                </div>

                <div className="chat-message-left pb-4">
                  <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                    <div className="text-muted small text-nowrap mt-2">2:44 am</div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div className="font-weight-bold mb-1">Sharon Lessman</div>
                    Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
                  </div>
                </div>

              </div>
            </div>

            <div className="flex-grow-0 py-3 px-4 paddingSetting">
              <div>
                <Row>
                  <Col span={21}>
                    <TextArea autosize
                      onResize={this.reSettingHeight}
                      rows={1} placeholder="Type your message" />
                  </Col>
                  <Col span={3} style={{ width: "100%" }}>
                    <div className="icon" style={{ position: "absolute", bottom: 0, right: 0 }}>
                      <IconSend size="extra-large" />
                      <IconMicrophone size="extra-large" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>





      </div>
    );
  }
}
export default connect((state) => ({ screenHeight: state.reHeight }))(index)