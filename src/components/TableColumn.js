import React from 'react'
import TableComp from './TableComp'
import { Input, Button, Space, Image } from 'antd'
import { withRouter } from 'react-router-dom'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { sendToEditor } from './../Actions/index';
import { connect } from 'react-redux'
import { Spin } from 'antd';
import axios from 'axios'
import ImageViewer from './ImageViewer';
class TableColumn extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        isModalVisible: false,
        visible: false,
        index: 0,
        source: '',
        orgImage: '',
        remImage: '',
        imgGroup: [],
        currentIndex: 0,
        isViewerOpen: false,
        currentImage: null,
        loading: false

    };

    componentDidMount() {
        console.log('cdm', this.props.dataSource)
        this.setState({ source: this.props.dataSource })
        const fimg = []
        this.props.dataSource.forEach(d => {
            fimg.push({ "img": d.editted_image, type: 'rem', 'data': d })
        })
        this.setState({ imgGroup: fimg })

    }
    objectsEqual = (o1, o2) =>
        typeof o1 === 'object' && Object.keys(o1).length > 0
            ? Object.keys(o1).length === Object.keys(o2).length
            && Object.keys(o1).every(p => this.objectsEqual(o1[p], o2[p]))
            : o1 === o2;
    componentDidUpdate(prevPros, prevState) {
        console.log(prevPros.dataSource, this.props.dataSource)
        if (prevPros.dataSource.length !== this.props.dataSource.length) {
            this.setState({ source: this.props.dataSource })
            const fimg = []
            this.props.dataSource.forEach(d => {
                fimg.push({ "img": d.editted_image, type: 'rem', 'data': d })
            })
            this.setState({ imgGroup: fimg })
        }


    }
    openImageViewer = (index) => {
        console.log('index', index)
        this.setState({ currentIndex: index, isViewerOpen: true });
        this.updateImage(index)
    };
    closeImageViewer = () => {
        this.setState({ currentIndex: 0, currentImage: null, isViewerOpen: false })
    }
    updateImage = (index) => {
        this.state.source.length > 0 && this.setState({ currentImage: this.state.imgGroup[index] })
    }
    changeFun = (val) => {
        const { currentIndex, imgGroup } = this.state

        if (val === 'prev') {
            if ((currentIndex - 1) < 0) return
            this.setState({ currentIndex: currentIndex - 1 })
            this.updateImage(currentIndex - 1)
        } else if (val === 'next') {
            if ((currentIndex + 1) > imgGroup.length) return
            this.setState({ currentIndex: currentIndex + 1 })
            this.updateImage(currentIndex + 1)
        }
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    openSingle = (val) => {
        this.props.history.push(`/client/${val}`)
    }
    toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
           reader.readAsDataURL(blob)
        }))
    getImage= async(image)=>{
        return await this.toDataURL(image)
        
        
    }
    columns = [
        {
            title: 'Orignal Image',
            dataIndex: 'original_image',
            key: 'original_image',
            render: (image, record, index) =>
                            {
                              return <Image
                                preview={true}
                                width={80}
                                style={{ cursor: 'pointer' }}
                                src={record.original_image}
                            /> 
                                 
                                
                              /*   return  <Image
                                preview={true}
                                width={80}
                                style={{ cursor: 'pointer' }}
                                src={this.getImage(record.original_image)}
                            />  */
                            }
                       
                    

        },
        {
            title: 'Removed Image',
            dataIndex: 'editted_image',
            key: 'editted_image',
            render: (image, record, index) => 
            <img width={80}  style={{ margin: '2px',cursor:'pointer' }} src={record.editted_image} alt="img" onClick={()=>this.openImageViewer(index)} />
           /*  <Image
                preview={false}
                width={80}
                src={record.editted_image}
                onClick={() => { this.openImageViewer(index) }}
            /> */
        },
        {
            title: 'Dealer ID',
            dataIndex: 'owner',
            key: 'owner',
            ...this.getColumnSearchProps('owner'),

            render: text => this.props.user && this.props.user.user.is_admin ? <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => this.openSingle(text)}>{text}</div> : text
        },
        {
            title: 'Dealer Name',
            dataIndex: 'dealer_name',
            key: 'dealer_name',
            ...this.getColumnSearchProps('dealer_name'),
            sorter: (a, b) => a.DealerName - b.DealerName
        },
        {
            title: 'VIN',
            dataIndex: 'vin',
            key: 'vin',
            ...this.getColumnSearchProps('vin'),
            sorter: (a, b) => a.VIN - b.VIN
        },
        {
            title: 'Stock Number',
            dataIndex: 'stock_number',
            key: 'stock_number',
            ...this.getColumnSearchProps('stock_number'),
            sorter: (a, b) => a.stock_number - b.stock_number
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            ...this.getColumnSearchProps('year'),
            sorter: (a, b) => a.year - b.year
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            ...this.getColumnSearchProps('model'),
        },
        {
            title: 'Trim',
            dataIndex: 'trim',
            key: 'trim',
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'vehicle_type',
            key: 'vehicle_type',
            ...this.getColumnSearchProps('vehicle_type'),
        },
        {
            title: 'Certified',
            dataIndex: 'certified',
            key: 'certified',
            render: (a) => <div > {a === true ? 'true' : 'false'} </div>
        },
        {
            title: 'Vehicle Age',
            dataIndex: 'vehicle_age',
            key: 'vehicle_age',
            ...this.getColumnSearchProps('vehicle_age'),
            sorter: (a, b) => a.vehicle_age - b.vehicle_age
        },
        {
            title: 'Image Modified',
            dataIndex: 'image_modified',
            key: 'image_modified',
        },
        {
            title: 'Lot Location',
            dataIndex: 'lot_location',
            key: 'lot_location',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {

            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (a) => <div style={{ cursor: 'pointer' }} onClick={() => {
                console.log('a', a)
                this.setState({ isModalVisible: true, originalImage: a.original_image, removedImage: a.processed_image, loading: true });
                this.openEditor(a)

            }}>
                <EditOutlined />
            </div>
        },
    ];
    handleCancel = () => {
        this.setState({ isModalVisible: true })
    };
    showModal = () => {
        this.setState({ isModalVisible: true })
    };
    handleTriggle = () => {
        this.setState(prevState => ({ visible: !prevState.visible }))
    }
    openEditor = async (a) => {
        let image = await axios.get(`${a.original_image}`, { responseType: 'arraybuffer' });
        let orignal = Buffer.from(image.data).toString('base64');
        image = await axios.get(`${a.processed_image}`, { responseType: 'arraybuffer' })
        let processed = Buffer.from(image.data).toString('base64')

        this.props.sendToEditor({ orignalImage: `data:image/png;base64,${orignal}`, removedImage: `data:image/png;base64,${processed}`, link: this.props.location.pathname, imgName: a.processed_image.split("/")[8], dealerId: a.owner }); this.props.history.push('/editor')
    }

    render() {
        return (
            <div>
                {(this.state.isViewerOpen && this.state.currentImage !== null) && (
                    <ImageViewer
                        current={this.state.currentImage}
                        changeFun={this.changeFun}
                        onClose={this.closeImageViewer}
                        link={"/inventory-list"}
                        setFetch={this.props.setFetch}
                    />
                )}
                {this.state.loading ? <div className="container">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                        <Spin />
                        <h3 className="ml-3">Opening Editor please wait...</h3>
                    </div>

                </div> :
                    <TableComp columns={this.columns} dataSource={this.state.source} loading={this.props.loading} />
                }

            </div>
        )
    }
}

export default withRouter(connect(null, { sendToEditor })(TableColumn))
