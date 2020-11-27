const Notification = ({ notificationMessage }) => {
    const notificationStyle = {
        color: notificationMessage.color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (notificationMessage.message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {notificationMessage.message}
        </div>
    )
}

export default Notification