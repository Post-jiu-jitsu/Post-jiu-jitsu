import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import TechTree from "../Component/TechTree";
import styles from "./Tech.module.css";

export default function Tech() {
  const { techTitle } = useParams();
  //   gaurdTypes: {
  //     title: "Guard Types",
  //     contents: [
  //       {
  //         title: "Open guard",
  //         link: "open-guard",
  //       },
  //       {
  //         title: "Closed guard",
  //         link: "closed-guard",
  //       },
  //       {
  //         title: "Spider guard",
  //         link: "spider-guard",
  //       },
  //       {
  //         title: "De La Riva guard",
  //         link: "deLaRiva-guard",
  //       },
  //       {
  //         title: "Half guard",
  //         link: "half-guard",
  //       },
  //       {
  //         title: "ETC.",
  //         link: "etc",
  //       },
  //     ],
  //   },
  //   sweeps: {
  //     title: "Sweeps",
  //     contents: [
  //       {
  //         title: "Open guard",
  //         link: "open-guard-sweep",
  //       },
  //       {
  //         title: "Closed guard",
  //         link: "closed-guard-sweep",
  //       },
  //       {
  //         title: "Spider guard",
  //         link: "spider-guard-sweep",
  //       },
  //       {
  //         title: "De La Riva guard",
  //         link: "deLaRiva-guard-sweep",
  //       },
  //       {
  //         title: "Half guard",
  //         link: "half-guard-sweep",
  //       },
  //       {
  //         title: "ETC.",
  //         link: "etc-sweep",
  //       },
  //     ],
  //   },
  //   submissions: {
  //     title: "Submissions",
  //     contents: [
  //       {
  //         title: "Open guard",
  //         link: "open-guard-submission",
  //       },
  //       {
  //         title: "Closed guard",
  //         link: "closed-guard-submission",
  //       },
  //       {
  //         title: "Spider guard",
  //         link: "spider-guard-submission",
  //       },
  //       {
  //         title: "De La Riva guard",
  //         link: "deLaRiva-guard-submission",
  //       },
  //       {
  //         title: "Half guard",
  //         link: "half-guard-submission",
  //       },
  //       {
  //         title: "ETC.",
  //         link: "etc-submission",
  //       },
  //     ],
  //   },
  // };
  const guards = [
    {
      title: "Guard Position",
      contents: [
        {
          title: "Open guard",
          link: "open-guard",
        },
        {
          title: "Closed guard",
          link: "closed-guard",
        },
        {
          title: "Spider guard",
          link: "spider-guard",
        },
        {
          title: "De La Riva guard",
          link: "deLaRiva-guard",
        },
        {
          title: "Half guard",
          link: "half-guard",
        },
        {
          title: "ETC.",
          link: "etc",
        },
      ],
    },
    {
      title: "Sweeps",
      contents: [
        {
          title: "Open guard",
          link: "open-guard-sweep",
        },
        {
          title: "Closed guard",
          link: "closed-guard-sweep",
        },
        {
          title: "Spider guard",
          link: "spider-guard-sweep",
        },
        {
          title: "De La Riva guard",
          link: "deLaRiva-guard-sweep",
        },
        {
          title: "Half guard",
          link: "half-guard-sweep",
        },
        {
          title: "ETC.",
          link: "etc-sweep",
        },
      ],
    },
    {
      title: "Submissions",
      contents: [
        {
          title: "Open guard",
          link: "open-guard-submission",
        },
        {
          title: "Closed guard",
          link: "closed-guard-submission",
        },
        {
          title: "Spider guard",
          link: "spider-guard-submission",
        },
        {
          title: "De La Riva guard",
          link: "deLaRiva-guard-submission",
        },
        {
          title: "Half guard",
          link: "half-guard-submission",
        },
        {
          title: "ETC.",
          link: "etc-submission",
        },
      ],
    },
    {
      title: "Escape",
      contents: [
        {
          title: "Side control",
          link: "side-escape",
        },
        {
          title: "Mount",
          link: "moun-escape",
        },
        {
          title: "Back control",
          link: "back-escape",
        },
        {
          title: "ETC.",
          link: "etc-escape",
        },
      ],
    },
  ];
  const tops = [
    {
      title: "Pass",
      contents: [
        {
          title: "Open guard",
          link: "open-guard-pass",
        },
        {
          title: "Closed guard",
          link: "closed-guard-pass",
        },
        {
          title: "Spider guard",
          link: "spider-guard-pass",
        },
        {
          title: "De La Riva guard",
          link: "deLaRiva-guard-pass",
        },
        {
          title: "Half guard",
          link: "half-guard-pass",
        },
        {
          title: "ETC.",
          link: "etc-pass",
        },
      ],
    },
    {
      title: "Top Position",
      contents: [
        {
          title: "Standing",
          link: "standing",
        },
        {
          title: "Side mount",
          link: "side",
        },
        {
          title: "Mount",
          link: "mount",
        },
        {
          title: "Back control",
          link: "back",
        },
        {
          title: "ETC.",
          link: "etc",
        },
      ],
    },

    {
      title: "Submissions",
      contents: [
        {
          title: "Standing",
          link: "standing",
        },
        {
          title: "Side mount",
          link: "side",
        },
        {
          title: "Mount",
          link: "mount",
        },
        {
          title: "Back control",
          link: "back",
        },
        {
          title: "ETC.",
          link: "etc",
        },
      ],
    },
  ];
  const drills = [
    {
      title: "Top Position",
      contents: [
        {
          title: "Standing",
          link: "standing",
        },
        {
          title: "Side mount",
          link: "side",
        },
        {
          title: "Mount",
          link: "mount",
        },
        {
          title: "Back control(Rear mount)",
          link: "back",
        },
        {
          title: "ETC.",
          link: "etc",
        },
      ],
    },
    {
      title: "Sweeps",
      contents: [
        {
          title: "Open guard",
          link: "open-guard-sweep",
        },
        {
          title: "Closed guard",
          link: "closed-guard-sweep",
        },
        {
          title: "Spider guard",
          link: "spider-guard-sweep",
        },
        {
          title: "De La Riva guard",
          link: "deLaRiva-guard-sweep",
        },
        {
          title: "Half guard",
          link: "half-guard-sweep",
        },
        {
          title: "ETC.",
          link: "etc-sweep",
        },
      ],
    },
    {
      title: "Submissions",
      contents: [
        {
          title: "Open guard",
          link: "open-guard-submission",
        },
        {
          title: "Closed guard",
          link: "closed-guard-submission",
        },
        {
          title: "Spider guard",
          link: "spider-guard-submission",
        },
        {
          title: "De La Riva guard",
          link: "deLaRiva-guard-submission",
        },
        {
          title: "Half guard",
          link: "half-guard-submission",
        },
        {
          title: "ETC.",
          link: "etc-submission",
        },
      ],
    },
  ];
  return (
    <>
      <div className={styles.techWrapper}>
        <h1>{techTitle.toUpperCase()}</h1>
        <div className={styles.categories}>
          {techTitle === "guard" ? <TechTree techs={guards} /> : null}
          {techTitle === "top" ? <TechTree techs={tops} /> : null}
          {techTitle === "drills" ? <TechTree techs={drills} /> : null}
        </div>
      </div>

      {/* Outlet component renders the matching child route in react-route 6 */}
      <Outlet />
    </>
  );
}
