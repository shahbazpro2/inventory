import React from 'react'
import { Table } from 'antd'

const TableComp = ({ dataSource, columns,loading,scrollBar=true }) => {
    
    return (
        <div>
            {scrollBar ?
            <Table dataSource={dataSource} columns={columns} scroll={{ x: 2300,y:500 }} pagination={{
                current: 1,
                pageSize: 300,
              }} loading={loading} />:
            <Table dataSource={dataSource} columns={columns} scroll={{y:500}} loading={loading} pagination={{
                current: 1,
                pageSize: 300,
              }} />}
        </div>
    )
}

export default TableComp
