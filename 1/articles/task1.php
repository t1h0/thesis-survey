<?php
session_start();
include("task1/".$_SESSION["articles"][$_POST][0]."/".$_SESSION["articles"][$_POST][1].".php");