// 透過 Prisma 的存在檢查，確保登入者只有一位
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}
// globalThis 是一個全域值, 瀏覽器/Node.js 環境下皆可使用
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client