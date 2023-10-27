package app

import (
	"dashboard/server/internal/transport/rest"
)

func Run() {
	rest.StartServer()
}
