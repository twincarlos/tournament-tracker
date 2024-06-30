import "./GroupCard.css";

export default function GroupCard() {
    return (
        <div className="card group-card">
            <div className="card-header">
                <div className="card-header-info">
                    <button className="icon-button">
                        <i className="fa-regular fa-eye" />
                    </button>
                    <p>Group 1</p>
                </div>
                <div className="card-header-tables">
                    <p>Tables 1,2</p>
                </div>
            </div>
            <div className="group-card-body">
                <div className="group-card-player">
                    <div className="group-card-player-name">
                        <p>2143 • Luis Mejia</p>
                    </div>
                    <div className="group-card-player-stats">
                        <p>2</p>
                        <p>2 - 1</p>
                    </div>
                </div>
                <div className="group-card-player">
                    <div className="group-card-player-name">
                        <p>2083 • Carlos Rodriguez</p>
                    </div>
                    <div className="group-card-player-stats">
                        <p>1</p>
                        <p>3 - 0</p>
                    </div>
                </div>
                <div className="group-card-player">
                    <div className="group-card-player-name">
                        <p>1854 • Samuel Leon</p>
                    </div>
                    <div className="group-card-player-stats">
                        <p>3</p>
                        <p>1 - 2</p>
                    </div>
                </div>
                <div className="group-card-player">
                    <div className="group-card-player-name">
                        <p>1633 • Alessandro Capitano</p>
                    </div>
                    <div className="group-card-player-stats">
                        <p>4</p>
                        <p>0 - 3</p>
                    </div>
                </div>
            </div>
        </div>
    );
};