import React, { useState, useRef, useEffect } from "react";
import './App.css';

export function Content() { 

    const API_URL='http://localhost:3500/items';
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [editingIndex, setEditingIndex] = useState(null); 
    const [newItemName, setNewItemName] = useState(""); 
    const [errormsg, setErrormsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const itemNameRef = useRef(null); 

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw Error("Data not received");
                }
                const listItems = await response.json();
                setItems(listItems);
                setErrormsg(null);
            } catch (error) {
                setErrormsg(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        setTimeout(()=>{
            (async () => await fetchItems())()
    },1000)}, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleNewItemNameChange = (e) => {
        setNewItemName(e.target.value);
    };

    const addItem = async () => {
        const itemName = itemNameRef.current ? itemNameRef.current.value : "";
        if (itemName.trim() !== "" && itemName.length < 30) {
            const newItem = { itemname: itemName, check: false }; // No need to set id here
            const postOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            };

            try {
                const response = await fetch(API_URL, postOption);
                if (!response.ok) {
                    throw Error("Failed to add item");
                }
                const addedItem = await response.json();
                setItems([...items, addedItem]);
                if (itemNameRef.current) {
                    itemNameRef.current.value = "";
                    itemNameRef.current.focus();
                }
            } catch (error) {
                setErrormsg(error.message);
            }
        } else if (itemName.length >= 30) {
            alert("Item name should be less than 30 characters");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    };

    const handleCheck = async (index) => {
        const updatedItems = items.map((item, i) => (index === i ? { ...item, check: !item.check } : item));
        setItems(updatedItems);

        const urlTarget = `${API_URL}/${items[index].id}`;
        const patchOption = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ check: updatedItems[index].check })
        };

        try {
            const response = await fetch(urlTarget, patchOption);
            if (!response.ok) {
                throw Error("Failed to update item");
            }
        } catch (error) {
            setErrormsg(error.message);
        }
    };

    const handleDelete = async (index) => {
        const urlTarget = `${API_URL}/${items[index].id}`;
        const deleteOption = {
            method: 'DELETE'
        };

        try {
            const response = await fetch(urlTarget, deleteOption);
            if (!response.ok) {
                throw Error("Failed to delete item");
            }
            const updatedItems = items.filter((item, i) => i !== index);
            setItems(updatedItems);
        } catch (error) {
            setErrormsg(error.message);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewItemName(items[index].itemname);
    };

    const saveEdit = async (index) => {
        const updatedItem = { ...items[index], itemname: newItemName };
        const urlTarget = `${API_URL}/${items[index].id}`;
        const patchOption = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        };

        try {
            const response = await fetch(urlTarget, patchOption);
            if (!response.ok) {
                throw Error("Failed to update item");
            }
            const updatedItems = items.map((item, i) => (index === i ? updatedItem : item));
            setItems(updatedItems);
            setEditingIndex(null);
            setNewItemName("");
        } catch (error) {
            setErrormsg(error.message);
        }
    };

    const filteredItems = items.filter(item => item.itemname.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="app-container">
            <div className="add-items-container">
                <input
                    ref={itemNameRef}
                    type="text"
                    onKeyPress={handleKeyPress} // Handle Enter key press
                    placeholder="Enter item name"
                    required
                />
                <button onClick={addItem}>Add Item</button>
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search items"
            />
            {isLoading ? (
        <h2 style={{marginLeft:'30%'}}>Loading items..</h2>
      ) : (
            <div className="items-container">
            {errormsg ? (
                    <h2 className="no-items-found">{errormsg}</h2>
                ) : filteredItems.length !== 0 ? (
                    filteredItems.map((item, index) => (
                        <div key={index} className="item">
                            <input
                                type="checkbox"
                                checked={item.check}
                                onChange={() => handleCheck(index)}
                            />
                            {editingIndex === index ? (
                                <>
                                    <input
                                    autoFocus
                                        type="text"
                                        value={newItemName}
                                        onChange={handleNewItemNameChange}                              
                                    />
                                    <button onClick={() => saveEdit(index)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <label
                                        style={{
                                            textDecoration: item.check ? 'line-through' : 'none',
                                            flexGrow: 1,
                                        }}
                                    >
                                        {item.itemname}
                                    </label>
                                    <button onClick={() => handleEdit(index)} style={{marginRight:'3px',backgroundColor:'#218838'}}>Edit</button>                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <h2 className="no-items-found">Add new Task found</h2>
                )}
            </div>)}
        </div>
    );
}
