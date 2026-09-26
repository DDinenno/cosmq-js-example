import Cosmq, { observe } from "cosmq-js";

const Component_AddUserModal = ({ onSubmit, onCancel }) => {
    const user = observe({
        name: "",
        birthDay: "",
        profession: "",
    })

    const handleSubmit = () => {
        onSubmit({
            ...user,
            birthDay: new Date(`${user.birthDay}`).toLocaleDateString()
        })
    }

    const handleInput = (e) => {
        user = { ...user, [e.target.id]: e.target.value }
    }

    return (
        <div className="modal" style={{ width: "400px" }}>
            <div style={{ width: "100%", marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
                <h2>Add User</h2>

                <button
                    style={{}}
                    className="alt"
                    handle:click={onCancel}
                >
                    X
                </button>
            </div>

            <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }} handle:input={handleInput}>
                <label style={{ textAlign: "left" }}>Name</label>
                <input
                    id="name"
                    value={user.name}
                />

                <label style={{ textAlign: "left" }}>Birth Day</label>
                <input

                    id="birthDay"
                    type="date"
                    value={user.birthDay}
                />

                <label style={{ textAlign: "left" }}>Profession</label>
                <input
                    id="profession"
                    value={user.profession}
                />
            </form >

            <button
                style={{ marginTop: "15px" }}
                disabled={
                    user.name === "" ||
                    user.birthDay === "" ||
                    user.profession === ""
                }
                handle:click={handleSubmit}
            >
                submit
            </button>
        </div>
    )
}

export default Component_AddUserModal;