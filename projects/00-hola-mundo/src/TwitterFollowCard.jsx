import { useState } from "react";

export function TwitterFollowCard({
  userName,
  name,
  initialIsFollowing,
}) {
  const [isFollowingState, setIsFollowingState] = useState(initialIsFollowing);

  const handleClick = () => {
    const newIsFollowingState = !isFollowingState;
    setIsFollowingState(newIsFollowingState);
  };

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          src={`https://unavatar.io/${userName}`}
          alt="El Avatar de midudev"
        />
        <div className="tw-followCard-info">
          <strong>{name}</strong>
          <span className="tw-followCard-infoUserName">
            @{userName}
          </span>
        </div>
      </header>

      <aside>
        <button
          onClick={handleClick}
          className={`tw-followCard-button ${
            isFollowingState ? "is-following" : ""
          }`}
        >
          <span className="tw-followCard-text">{isFollowingState ? "Siguiendo" : "Seguir"}</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}
