import { relations } from 'drizzle-orm';
import { date, double, int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  salt: varchar({ length: 255 }).notNull(),
  created_at: date().default(new Date()),
  updated_at: date().default(new Date()),
});

export const teams = mysqlTable('teams', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  short_name: varchar({ length: 4 }).notNull(),
  badge: varchar({ length: 255 }).notNull(),
  budget: double().notNull().default(5_000_000),
  userId: int('user_id'),
  created_at: date().default(new Date()),
  updated_at: date().default(new Date()),
});

export const players = mysqlTable('players', {
  id: serial().primaryKey(),
  player_name: varchar({ length: 255 }).notNull(),
  position: varchar({ length: 3 }).notNull(),
  market_price: int().notNull(),
  teamId: int('team_id'),
  created_at: date().default(new Date()),
  updated_at: date().default(new Date()),
})

export const usersRelations = relations(users, ({ one }) => ({
	teams: one(teams, {
    fields: [users.id],
    references: [teams.userId],
  }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
	user: one(users, {
		fields: [teams.userId],
		references: [users.id],
	}),
  players: many(players),
}));

export const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  })
}))