import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";
import { useFormik } from 'formik';
export const TreeNode = () => {

    // type TreeNode = {
    //     title: string,
    //     childs: Array<TreeNode>
    // }

    // const Node = (title: string, ...childs: TreeNode[]): TreeNode => {
    // let some = {
    //     title,
    //     childs:childs??[]
    // }
    //     return some;
    // }

    // let valuchain = Node('root');
    // let currentNode = valuchain;
    // currentNode.childs.push(Node('step 1')) 
    // currentNode.childs.push(Node('step 2')) 
    // currentNode=valuchain.childs![0];    
    // currentNode.childs.push(Node('step 1-1')) 
    // currentNode.childs.push(Node('step 1-2')) 
    // currentNode = valuchain.childs![1];
    // currentNode.childs.push(Node('step 2-1')) 
    // currentNode.childs.push(Node('step 2-2')) 
    // currentNode = (valuchain.childs![0]).childs![0];
    // currentNode.childs.push(Node('step 1-1-1')) 
    // currentNode.childs.push(Node('step 1-1-2')) 
    // currentNode.childs.push(Node('step 1-1-3')) 
    // console.log(valuchain);

    interface TreeNode {
        title: string,
        childs: Array<TreeNode>,
        id: number
    }

    const [root, setRoot] = useState<TreeNode>(
        {
            title: 'root',
            childs: [],
            id: 0
        }
    );
    const [currentNode, setCurrentNode] = useState<TreeNode>(root);
    const [idPath, setIdPath] = useState<Array<any>>([]);
    const [value, setValue] = useState<any>([]);

    const formik = useFormik<any>({
        initialValues: {
            step: root
        },
        onSubmit: values => { }
    })

    const bredCrump = (idPath: any, root: any) => {
        let newNode = root;
        let arr: any = []
        for (let i = 0; i < idPath.length - 1; i++) {
            console.log(newNode.childs)
            //   arr.push(newNode.childs[i].title)
            //     newNode=newNode.child[i]
        }

    }

    const AddItem = (id: number) => {
        const current = formik.values.step.childs
        current.push(
            {
                title: '',
                childs: [],
                id: id
            }
        )

        formik.setFieldValue('step', formik.values.step)
        setRoot({ ...root });
    }

    const findCurrentItem = (idPath: any, root: any) => {
        let newNode = root;
        idPath.map((index: any) => newNode = newNode.childs[index]);
        return newNode;
    }

    const showStep = (index: number) => {
        idPath.push(index);
        setIdPath([...idPath]);
        let currentItem = findCurrentItem(idPath, root);
        formik.setFieldValue('step', currentItem);
        bredCrump(idPath, root)
    }

    const deleteButton = (id: number) => {
        let currentItem1 = findCurrentItem(idPath, root);
        currentItem1.childs = currentItem1.childs.filter((item: any) => item.id !== id);
        formik.setFieldValue('step', { ...currentItem1 })
        setRoot({ ...root });
    }

    const onChangHandler = (index: number, newValue: string) => {
        let currentItem = formik.values.step
        currentItem.childs[index].title = newValue;
        formik.setFieldValue('step', { ...currentItem });
        setRoot({ ...root });
    }


    // console.log('root', root);




    return <div>
        <div></div>
        <div>{formik.values.step.title}</div>
        <button onClick={() => { AddItem((Math.random())) }} >Add</button>
        {formik.values.step.childs.map((item: any, index: any) => <div key={index} >
            <input name={item.id} onChange={(event) => onChangHandler(index, event.target.value)} />
            <button onClick={() => { showStep(index) }} >{item.id}</button>
            <button onClick={() => { deleteButton(item.id) }} >Delete</button>
        </div>)}
    </div>
}