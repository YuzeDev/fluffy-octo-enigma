"use server"
import fs from "fs"
import path from "path"

export default async function getHeroes() {
  const filePath = path.join(process.cwd(), "public", "heronames.txt")
  try {
    const data = fs.readFileSync(filePath, "utf8")
    const arrayData: string[] = data.split("\n")
    return arrayData.map((name) => ({
      name,
      img: `/assets/hero/${name
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/'/g, "_")}.png`,
    }))
  } catch (err) {
    console.log(err)
    return []
  }
}
