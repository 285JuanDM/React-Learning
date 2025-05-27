import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
    {
        userName: "pheralb",
        name: "Juan Pablo Correa",
        initialIsFollowing: true,
    },
    {
        userName: "midudev",
        name: "Miguel Angel Duran",
        initialIsFollowing: true,
    },
    {
        userName: "elonmusk",
        name: "Elon Musk",
        initialIsFollowing: false,
    },
    {
        userName: "veeder",
        name: "Veeder",
        initialIsFollowing: false,
    },
    {
        userName: "pablomonteserin",
        name: "Pablo Monteserin",
        initialIsFollowing: true,
    }
]

export function App() {
  return (
    <section className="App">
        {
            users.map((user) => (
                <TwitterFollowCard 
                    key={user.userName}
                    userName={user.userName}
                    name={user.name}
                    initialIsFollowing={user.initialIsFollowing}/>
            ))
        }
    </section>
  );
}
