import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { API_URLS } from "helper/apiConstant";
import { deleteRequest, getRequest, postRequest } from "helper/api";
import { toast } from "react-toastify";

const Card = ({ text, index }) => {
    return (
        <Draggable draggableId={text} index={index}>
            {(provided) => (
                <div
                    className="card"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {text}
                </div>
            )}
        </Draggable>
    );
};

// List component
const List = ({ title, cards, onAddCard, listIndex }) => {
    const [newCardText, setNewCardText] = useState('');

    const handleAddCard = () => {
        if (newCardText.trim() !== '') {
            onAddCard(newCardText, listIndex);
            setNewCardText('');
        }
    };

    return (
        <div className="list">
            <h3>{title}</h3>
            <Droppable droppableId={title}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map((card, index) => (
                            <Card key={card} text={card} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="add-card">
                <textarea
                    placeholder="Enter card text..."
                    value={newCardText}
                    onChange={(e) => setNewCardText(e.target.value)}
                ></textarea>
                <button onClick={handleAddCard}>Add Card</button>
            </div>
        </div>
    );
};

// Board component
const Board = ({ lists, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                {lists.map((list, index) => (
                    <List
                        key={list.title}
                        title={list.title}
                        cards={list.cards}
                        onAddCard={list.onAddCard}
                        listIndex={index}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};

export default function pipeline(props) {

    const [lists, setLists] = useState([
        {
            title: 'Open Leads',
            cards: ['Task 1', 'Task 2', 'Task 3'],
            onAddCard: (text, listIndex) => addCard(text, listIndex),
        },
        {
            title: 'First Converstation',
            cards: ['Task 4', 'Task 5'],
            onAddCard: (text, listIndex) => addCard(text, listIndex),
        },
        {
            title: 'Propsect',
            cards: ['Task 6'],
            onAddCard: (text, listIndex) => addCard(text, listIndex),
        },
        {
            title: 'In Progress',
            cards: ['Task 6'],
            onAddCard: (text, listIndex) => addCard(text, listIndex),
        },
        {
            title: 'Deal Won',
            cards: ['Task 6'],
            onAddCard: (text, listIndex) => addCard(text, listIndex),
        },
        {
            title: 'Deal Lost',
            cards: ['Task 6'],
            onAddCard: (text, listIndex) => addCard(text, listIndex),
        },
        {
            title: 'Junk Leads',
            cards: ['Task 6'],
            onAddCard: (text, listIndex) => addCard(text, listIndex),
        },
    ]);

    useEffect(()=>{
        getPipeline();
    },[])
    async function getPipeline(value = false) {
        var response;
        response = await getRequest({ API: API_URLS.PIPELINE + "/" + props.pipeline });
        console.log(response)
        var data = []
        if (await response?.status === 200) {
            // data.push(response?.data?.data)
            // setPaginations(response?.data?.meta)
            // setRegistations(response?.data?.data);
            // setIsLoading(false)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }




    const addCard = (text, listIndex) => {
        const newLists = [...lists];
        newLists[listIndex].cards.push(text);
        setLists(newLists);
    };
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceListIndex = source.droppableId;
        const destinationListIndex = destination.droppableId;

        if (sourceListIndex === destinationListIndex) {
            const listIndex = parseInt(sourceListIndex, 10);
            const newLists = [...lists];
            const newList = { ...newLists[listIndex] };
            const reorderedCards = Array.from(newList.cards);
            reorderedCards.splice(source.index, 1);
            reorderedCards.splice(destination.index, 0, lists[listIndex].cards[source.index]);
            newList.cards = reorderedCards;
            newLists[listIndex] = newList;
            setLists(newLists);
        } else {
            const sourceListIndexInt = parseInt(sourceListIndex, 10);
            const destinationListIndexInt = parseInt(destinationListIndex, 10);
            const newLists = [...lists];
            const sourceList = { ...newLists[sourceListIndexInt] };
            const destinationList = { ...newLists[destinationListIndexInt] };
            const movedCard = sourceList.cards.splice(source.index, 1)[0];
            destinationList.cards.splice(destination.index, 0, movedCard);
            newLists[sourceListIndexInt] = sourceList;
            newLists[destinationListIndexInt] = destinationList;
            setLists(newLists);
        }
    };
    // const onDragEnd = (result) => {
    //     const { source, destination } = result;
    //     if (!destination) return;

    //     const sourceListIndex = source.droppableId;
    //     const destinationListIndex = destination.droppableId;

    //     if (sourceListIndex === destinationListIndex) {
    //         const listIndex = parseInt(sourceListIndex, 10);
    //         const newLists = [...lists];
    //         const [removed] = newLists[listIndex].cards.splice(source.index, 1);
    //         newLists[listIndex].cards.splice(destination.index, 0, removed);
    //         setLists(newLists);
    //     } else {
    //         const sourceListIndexInt = parseInt(sourceListIndex, 10);
    //         const destinationListIndexInt = parseInt(destinationListIndex, 10);
    //         const newLists = [...lists];
    //         const [removed] = newLists[sourceListIndexInt].cards.splice(
    //             source.index,
    //             1
    //         );
    //         newLists[destinationListIndexInt].cards.splice(
    //             destination.index,
    //             0,
    //             removed
    //         );
    //         setLists(newLists);
    //     }
    // };

    return (
        <div className="kanbanboardListing">
            <h1>Kanban Board</h1>
            <Board lists={lists} onDragEnd={onDragEnd} />
        </div>
    );
};
