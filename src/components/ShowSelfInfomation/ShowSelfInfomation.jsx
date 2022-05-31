import React, { Component } from 'react'

import { Modal, Avatar, Upload, Toast, Form } from '@douyinfe/semi-ui'
import { IconCamera } from '@douyinfe/semi-icons';
import { connect } from 'react-redux';
import { saveUserInfoAction } from '../../redux/actions/login_action'
import { updateInfo } from '../../API'

import './index.css'
import { BASE_URL } from '../../config/config';


class ShowSelfInfomation extends Component {

  state = {
    username_update: '',
    signaturePerson_update: '',
    signaturePersonFlag: true,
    usernameFlag: true
  }

  //点击更新按钮
  handleSubmit = async () => {
    const { username_update, usernameFlag, signaturePerson_update, signaturePersonFlag } = this.state
    if (usernameFlag && signaturePersonFlag)
      if (username_update !== '') {
        const { username, signaturePerson, number_id } = this.props.userInfo
        const aaa = await updateInfo({ username, number_id, username_update, signaturePerson, signaturePerson_update })
        console.log(aaa);
        if (aaa.status !== 200)
          Toast.error(aaa.msg);
        if (aaa.status === 200) {
          const { username, userPhoto: userPhotoBase64, signaturePerson, number_id } = aaa.data
          this.props.updateUserInfo({ username, number_id, signaturePerson, userPhotoBase64 })
          Toast.success("更新信息成功")
        }
      }
      else Toast.error("请输入用户名和密码");
    else
      Toast.error("请输入合法的数据")
  };

  asyncValiusername = (e) => {
    const re = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
    const a = e.match(re)
    a == null ? this.setState({ usernameFlag: false }) : this.setState({ usernameFlag: true })
    if (!a) return "字母开头、 5-16位、字母数字下划线";
  }


  asyncValisignaturePerson = (e) => {
    if (e.length > 30) {
      this.setState({ signaturePersonFlag: false })
      return "个性签名字数应不超过30";
    }
    this.setState({ signaturePersonFlag: true })
  }

  //*  利用form的change事件，将值赋值给state
  setUserInfo = (value) => {
    const { username, signaturePerson } = value
    this.setState({
      username_update: username !== undefined ? username : '',
      signaturePerson_update: signaturePerson !== undefined ? signaturePerson : ''
    })
  }

  //点击取消
  handleCancel = () => {
    this.props.changeSelfFlag()
  }


  //更新头像
  onSuccess = (response, file) => {
    if (response.status === 200) {
      Toast.success('头像更新成功');
      console.log(response.data);
      const { username, number_id, signaturePerson, userPhoto: userPhotoBase64 } = response.data
      this.props.updateUserInfo({data:{ username, number_id, signaturePerson, userPhotoBase64 }})
    }
  };

  style = {
    backgroundColor: 'var(--semi-color-overlay-bg)',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--semi-color-white)',
  };

  componentDidMount() {
    this.setState({
      username_update: this.props.userInfo.username,
      signaturePerson_update: this.props.userInfo.signaturePerson
    })
  }


  hoverMask = (<div style={this.style}> <IconCamera size="extra-large" /> </div>);

  render() {

    return (
      <div>
        <Modal
          title="个人信息"
          okText="更新"
          mask={false}
          style={{ width: 350, height: 500 }}
          visible={true}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}  //点击 "x",最小化视频窗口
        >
          <div className="headerImg">
            <Upload
              data={{ username: this.props.userInfo.username, number_id: this.props.userInfo.number_id }}
              className="avatar-upload"
              name={"aaa"}
              action={`${BASE_URL}/update_userPhoto`}
              onSuccess={this.onSuccess}
              accept='image/*'
              maxSize={1024} //最大上传1M
              showUploadList={false}
              onError={() => Toast.error('上传失败')}
            >
              <Avatar src={this.props.userInfo.userPhotoImg}
                hoverMask={this.hoverMask}
                size="extra-large" style={{ margin: "0 auto" }} />
            </Upload>

          </div>
          <div className="text">
            <Form
              showValidateIcon={false}
              onValueChange={(e) => { this.setUserInfo(e) }}
            >
              <Form.Input
                initValue={this.props.userInfo.username}
                validate={this.asyncValiusername}
                trigger='blur'
                field="username"
                label={{
                  text: " ",
                }}
                labelPosition='left'
                size='large'
                showClear
              />

              <Form.TextArea
                label={{
                  text: " ",
                }}
                initValue={this.props.userInfo.signaturePerson}
                labelPosition='left'
                field='signaturePerson'
                validate={this.asyncValisignaturePerson}
                style={{ height: 110 }}
                maxCount={30}
                showClear
              />
            </Form>
          </div>
        </Modal >
      </div >
    )
  }
}

export default connect(state => ({}), { updateUserInfo: saveUserInfoAction })(ShowSelfInfomation)