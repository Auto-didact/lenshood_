import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Checkbox, Upload, Icon, Modal } from 'antd';
import { PageLayout } from '@gqlapp/look-client-react';
// import "./resources/listingCatalogue.css";
import ListYGSteps from './components/ListYGSteps';

const { TextArea } = Input;

class ListTourGearProduct extends Component {
  state = {
    package: ['Naruto', 'Sasuke', 'Sakura', 'Minato', 'Jiraiya', 'Tsunade', 'Hinata', 'Shikamaru', 'Choji'],
    category: [
      {
        icon: 'camera',
        name: 'Camera'
      },
      {
        icon: 'printer',
        name: 'DSLR'
      },
      {
        icon: 'filter',
        name: 'Lens'
      },
      {
        icon: 'video-camera',
        name: 'Video Camera'
      },
      {
        icon: 'rocket',
        name: 'Drone and arial'
      },
      {
        icon: 'cluster',
        name: 'Tripod and Support'
      },
      {
        icon: 'bulb',
        name: 'Lighting'
      },
      {
        icon: 'sound',
        name: 'Audio and recording'
      },
      {
        icon: 'radar-chart',
        name: 'Others'
      }
    ],
    value: '',
    previewVisible: false,
    previewImage: '',
    fileList: []
  };
  classNamesgroup(e) {
    if (this.state.value === e) {
      return 'ActiveCond prodDiv';
    } else {
      return 'NotActive prodDiv';
    }
  }
  renderCategory(e) {
    this.setState({ value: e });
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div style={{ textAlign: 'center' }} className="ant-upload-text">
          Upload
        </div>
      </div>
    );
    return (
      <PageLayout>
        <div className="Listyourgearcards">
          <Row>
            <Col md={{ span: 14, offset: 5 }} sm={{ span: 20, offset: 2 }} className="LYGcol1">
              <ListYGSteps step={1} />
              <Form layout="vertical">
                <Form.Item label={<strong>Listing title</strong>}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item label={<strong>Model name</strong>}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item label={<strong>Brand Name</strong>}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item label={<strong>In the package</strong>}>
                  <p className="font10">Select your offering</p>
                  <Checkbox.Group width={'100%'}>
                    <Row gutter={16}>
                      {this.state.package.map(item => (
                        <Col span={12}>
                          <Checkbox value={item}>{item}</Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item label={<strong>Gear category</strong>}>
                  <p className="font10">Select the closest category your gear belongs to</p>
                  <Row gutter={16}>
                    {this.state.category.map(item => (
                      <Col md={6} sm={8} xs={12}>
                        <div onClick={e => this.renderCategory(item.name)} className={this.classNamesgroup(item.name)}>
                          <div>
                            <Icon type={item.icon} />
                          </div>
                          <h5>{item.name}</h5>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Form.Item>
                <Form.Item label={<strong>Upload Images</strong>}>
                  <p className="font10">Upload upto 4 images in jpj, jpeg, png format.</p>
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 4 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="" width={'100%'} src={previewImage} />
                  </Modal>
                </Form.Item>
                <Row gutter={32}>
                  <Col span={12}>
                    <Form.Item label={<strong>Serial Number</strong>}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<strong>Mount</strong>}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label={<strong>Add a description</strong>}>
                  <TextArea rows="6" />
                </Form.Item>
                <Form.Item>
                  <Button className="listSubmitButton">Next</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
export default ListTourGearProduct;
