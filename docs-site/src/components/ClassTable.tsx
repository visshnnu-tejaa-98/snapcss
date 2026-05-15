interface Row {
  cls: string
  css: string
  note?: string
}

interface ClassTableProps {
  rows: Row[]
  headers?: [string, string, string?]
}

export default function ClassTable({
  rows,
  headers = ['Class', 'CSS Output', 'Notes'],
}: ClassTableProps) {
  const hasNotes = rows.some((r) => r.note)

  return (
    <div className="class-table-wrap">
      <table className="class-table">
        <thead>
          <tr>
            <th>{headers[0]}</th>
            <th>{headers[1]}</th>
            {hasNotes && <th>{headers[2]}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>
                <code className="cls">{row.cls}</code>
              </td>
              <td>
                <code className="css-val">{row.css}</code>
              </td>
              {hasNotes && (
                <td>
                  {row.note && <span className="note">{row.note}</span>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
