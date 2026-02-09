import { useEffect, useState } from "react";

export function JSON() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      // 네트워크 느린 척
      await new Promise((r) => setTimeout(r, 2500));

      const res = await fetch("/mock-data.json");
      const data = await res.json();

      setLogs(data);
      setLoading(false);
    }

    run();
  }, []);

  return (
    <div>
      <h3>❌ JSON (All at once)</h3>
      {loading && <p>로딩 중...</p>}
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            [{log.time}] {log.type} → {log.target}
          </li>
        ))}
      </ul>
    </div>
  );
}
