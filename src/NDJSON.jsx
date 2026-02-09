import { useEffect, useState } from "react";

export default function Stream() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function streamNDJSON() {
      setLoading(true);

      const response = await fetch("/mock-data.ndjson");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done || cancelled) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop(); // 미완성 라인 보관

        for (const line of lines) {
          if (!line.trim()) continue;

          const json = JSON.parse(line);

          // 💡 스트리밍 느낌을 주기 위해 일부러 딜레이
          await new Promise((r) => setTimeout(r, 500));

          setLogs((prev) => [...prev, json]);
        }
      }

      setLoading(false);
    }

    streamNDJSON();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📡 Activity Stream (NDJSON)</h2>

      {loading && <p>스트리밍 중...</p>}

      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>[{log.time}]</strong> {log.type} → {log.target}
          </li>
        ))}
      </ul>
    </div>
  );
}
